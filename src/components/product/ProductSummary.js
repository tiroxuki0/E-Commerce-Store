import React from "react";
import ReactStars from "react-rating-stars-component";
import useActive from "../../hooks/useActive";
import { v4 as uuid } from "uuid";
import ProductReviews from "./ProductReviews";
import { useSelector, useDispatch } from "react-redux";
import { toggleForm as toggleFormRedux } from "../../redux/commonSlice";
import { addDocument } from "../../firebase/service";

const ProductSummary = (props) => {
  const { id, brand, title, info, category, type, connectivity } = props;
  const dispatch = useDispatch();
  const reviewsData = useSelector((state) => state.data.reviews);
  const formUserInfo = useSelector((state) => state.common.formUserInfo);
  const [rate, setRate] = React.useState(5);
  const commentDiv = React.useRef();
  const [comment, setComment] = React.useState("");
  const [error, setError] = React.useState("");

  const handleEnterPressed = (e) => {
    if (e.keyCode === 13) {
      handleSendCmt(e);
    }
  };

  const handleSendCmt = (e) => {
    e.preventDefault();
    if (!formUserInfo) {
      dispatch(toggleFormRedux(true));
    } else {
      const date = new Date();
      const text = Date().toLocaleString();
      if (comment) {
        addDocument("reviewsData", {
          id: uuid(),
          productId: id,
          name: formUserInfo.username,
          uid: formUserInfo.uid,
          photoURL: formUserInfo.photoURL,
          rateCount: rate,
          review: comment,
          createdAt: {
            text: text.split(date.getFullYear())[0] + date.getFullYear(),
            second: date.getTime() / 1000,
          },
        });
        setComment("");
      } else {
        setError("Please type your comment!");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const { active, handleActive, activeClass } = useActive("specs");

  React.useEffect(() => {
    commentDiv.current?.scrollIntoView({ behavior: "smooth" });
  }, [reviewsData]);

  return (
    <>
      <section id="product_summary" className="section">
        <div className="container">
          {/*===== Product-Summary-Tabs =====*/}
          <div className="prod_summary_tabs">
            <ul className="tabs">
              <li
                className={`tabs_item ${activeClass("specs")}`}
                onClick={() => handleActive("specs")}
              >
                Specifications
              </li>
              <li
                className={`tabs_item ${activeClass("overview")}`}
                onClick={() => handleActive("overview")}
              >
                Overview
              </li>
              <li
                className={`tabs_item ${activeClass("reviews")}`}
                onClick={() => handleActive("reviews")}
              >
                Reviews
              </li>
            </ul>
          </div>

          {/*===== Product-Summary-Details =====*/}
          <div className="prod_summary_details">
            {active === "specs" ? (
              <div className="prod_specs">
                <ul>
                  <li>
                    <span>Brand</span>
                    <span>{brand}</span>
                  </li>
                  <li>
                    <span>Model</span>
                    <span>{title}</span>
                  </li>
                  <li>
                    <span>Generic Name</span>
                    <span>{category}</span>
                  </li>
                  <li>
                    <span>Headphone Type</span>
                    <span>{type}</span>
                  </li>
                  <li>
                    <span>Connectivity</span>
                    <span>{connectivity}</span>
                  </li>
                  <li>
                    <span>Microphone</span>
                    <span>Yes</span>
                  </li>
                </ul>
              </div>
            ) : active === "overview" ? (
              <div className="prod_overview">
                <h3>
                  The <span>{title}</span> {info} provides with fabulous sound
                  quality
                </h3>
                <ul>
                  <li>Sound Tuned to Perfection</li>
                  <li>Comfortable to Wear</li>
                  <li>Long Hours Playback Time</li>
                </ul>
                <p>
                  Buy the{" "}
                  <b>
                    {title} {info}
                  </b>{" "}
                  which offers you with fabulous music experience by providing
                  you with awesome sound quality that you can never move on
                  from. Enjoy perfect flexibility and mobility with amazing
                  musical quality with these {category} giving you a truly
                  awesome audio experience. It blends with exceptional sound
                  quality and a range of smart features for an unrivalled
                  listening experience.
                </p>
              </div>
            ) : (
              <div className="prod_reviews">
                <ul className="comment_list">
                  <div
                    style={{ width: "100%", height: "5px" }}
                    ref={commentDiv}
                  ></div>
                  {reviewsData.filter((item) => item.productId === id).length >
                  0 ? (
                    reviewsData
                      .filter((item) => item.productId === id)
                      .sort(function (a, b) {
                        return (
                          parseFloat(b.createdAt.second) -
                          parseFloat(a.createdAt.second)
                        );
                      })
                      .map((item) => <ProductReviews key={item.id} {...item} />)
                  ) : (
                    <li>No comment</li>
                  )}
                </ul>
                <div className="separator"></div>
                <h3>Leave a reviews</h3>
                <div
                  className="comment_container"
                  style={{ marginTop: "15px" }}
                >
                  <form className="input_form" onSubmit={handleSendCmt}>
                    <textarea
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      onKeyDown={(e) => handleEnterPressed(e)}
                      style={{ border: "1px solid grey" }}
                    />
                    <ReactStars
                      value={5}
                      count={5}
                      onChange={(rateStars) => setRate(rateStars)}
                      size={30}
                      activeColor="#ffd700"
                    />
                    <button type="submit" className="btn">
                      Comment
                    </button>
                  </form>
                  {error && <p>{error}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSummary;
