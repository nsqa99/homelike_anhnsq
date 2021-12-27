import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import CSSModules from "react-css-modules";
import style from "../../styles/body.module.scss";
import { useDispatch, useSelector } from "react-redux";
import RightPanel from "./RightPanel";
import _ from "lodash";

import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import DefaultAvatar from "../../../../constants/images/DefaultAvatar.png";
import styled from "styled-components";
import TableDetails from "./TableDetails";
import StarIcon from "@material-ui/icons/Star";
import Comment from "../../../../components/Comment";
import CustomPagination from "../../../../components/Pagination";
import ReserveModal from "../ReserveModal";
import { MySlider } from "../../../../components/Slider";
import { getOneUser } from "../../../../redux/user/user.action";
import {
  createReview,
  getAllReview,
} from "../../../../redux/review/review.action";

const CustomSlider = styled.div`
  .slick-list {
    height: 500px;
    border-radius: 3px;

    img {
      object-fit: cover;
      min-height: 500px;
    }
  }
`;

const DetailBody = ({ item, isAuthenticated, currentUser }) => {
  const user = useSelector((state) => state.users);
  const listReviews = useSelector((state) => state.reviews);
  const [review, setReview] = useState({
    itemId: item.id,
    content: "",
    rate: 0,
  });
  const [content, setContent] = useState("");
  const [rate, setRate] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    if (item) {
      dispatch(getOneUser(item.owner.username));
      dispatch(getAllReview(item.id));
    }
  }, []);

  const handleReview = (e) => {
    dispatch(createReview(review));
    setContent("");
    setRate(0);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);

    setReview({ ...review, content: e.target.value });
  };

  const handleRateChange = (e) => {
    setRate(e.target.value);

    setReview({ ...review, rate: parseInt(e.target.value) });
  };

  const carouselImages = item.apartment.image_urls?.length
    ? item.apartment.image_urls.map((image) => {
        return { key: image.url, altText: "Image", src: image.url };
      })
    : [
        {
          altText: "Test",
          key: 1,
          // src: DefaultImage,
          src: DefaultAvatar,
        },
        {
          altText: "Test2",
          key: 2,
          // src: DefaultImage,
          src: DefaultAvatar,
        },
        {
          altText: "Test3",
          key: 3,
          // src: DefaultImage,
          src: "https://picsum.photos/id/678/1200/600",
        },
      ];

  return (
    <>
      {!_.isEqual(user.username, "") ? (
        <Row>
          <Col md="12" lg="9" className="mt-4">
            <div styleName="body__title" className="mb-5">
              Gallery
            </div>
            <CustomSlider>
              <MySlider items={carouselImages} />
            </CustomSlider>
            <div styleName="body__description" className="mt-5">
              <div styleName="body__title">Description</div>
              <div styleName="body__description--content">
                {item.description}
              </div>
            </div>
            <Row styleName="body__table">
              <Col sm="12" md="5">
                <TableDetails item={item} />
                {isAuthenticated && currentUser !== item.owner.username && (
                  <ReserveModal item={item} />
                )}
              </Col>
              <Col sm="12" md="7">
                <div styleName="body__title">Location</div>
              </Col>
            </Row>
            <Card styleName="body__merchant">
              <CardBody>
                <div className="d-flex align-items-center mb-2">
                  <img src={user.avatar} styleName="body__merchant--avatar" />
                  <CardTitle tag="h5" className="ms-2 mb-0">
                    {user.user_full_name}
                  </CardTitle>
                  <div className="ms-auto">
                    {Array(item.rate)
                      .fill()
                      .map((_, index) => (
                        <StarIcon
                          key={index}
                          styleName="body__icon--star"
                        ></StarIcon>
                      ))}
                  </div>
                </div>
                <CardSubtitle className="mb-2 ms-1 text-muted" tag="h6">
                  Host
                </CardSubtitle>

                <hr />

                {isAuthenticated ? (
                  currentUser !== item.owner.username ? (
                    <>
                      {"Comments"}
                      <Row>
                        <Col xs="12" md="9">
                          <Input
                            id="comment"
                            name="comment"
                            type="textarea"
                            placeholder="Write down your comment"
                            className="mt-3"
                            rows="5"
                            onChange={handleContentChange}
                            value={content}
                          />
                          <Button
                            color="danger"
                            className="mt-3 mb-5"
                            onClick={handleReview}
                          >
                            Post
                          </Button>{" "}
                        </Col>
                        <Col xs="12" md="3">
                          <Label for="rate">Rate this apartment</Label>
                          <Input
                            id="rate"
                            name="rate"
                            type="select"
                            value={rate}
                            onChange={handleRateChange}
                          >
                            <option value="0">None</option>
                            <option value="1">Awful</option>
                            <option value="2">Suffuring</option>
                            <option value="3">Nothing special</option>
                            <option value="4">Great</option>
                            <option value="5">Awesome</option>
                          </Input>
                        </Col>
                      </Row>
                      <hr />
                    </>
                  ) : null
                ) : (
                  <div className="fs-6 mt-2 fw-bold fst-italic">
                    Sign in to say something about this apartment
                  </div>
                )}

                {listReviews.list?.length > 0 ? (
                  <>
                    {listReviews.list
                      .slice(0)
                      .reverse()
                      .map((review) => {
                        const isOwner =
                          isAuthenticated &&
                          review.owner.username === currentUser;
                        return (
                          <Comment
                            key={review.id}
                            review={review}
                            isOwner={isOwner}
                          />
                        );
                      })}
                    <CustomPagination
                      totalPages={listReviews.pagination?.total_pages}
                      currentPage={listReviews.pagination?.page}
                      itemId={item.id}
                    />
                  </>
                ) : (
                  <div className="fs-6 mt-2 fw-bold fst-italic mt-5 mb-4 w-100 text-center">
                    No review
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col md="12" lg="3" className="pl-3">
            <RightPanel items={item.similar_items} />
          </Col>
        </Row>
      ) : null}
    </>
  );
};
export default CSSModules(DetailBody, style);
