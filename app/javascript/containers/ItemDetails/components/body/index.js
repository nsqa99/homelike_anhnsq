import React, { useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import style from "../../styles/body.module.scss";
import { useDispatch, useSelector } from "react-redux";
import RightPanel from "./RightPanel";
import _, { isEqual } from "lodash";

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
import Review from "../../../../components/Review";
import CustomPagination from "../../../../components/Pagination";
import ReserveModal from "../ReserveModal";
import { MySlider } from "../../../../components/Slider";
import { getOneUser } from "../../../../redux/user/user.action";
import {
  createReview,
  getAllReview,
} from "../../../../redux/review/review.action";
import { getOneOrderByItem } from "../../../../redux/order/order.action";
import Map from "./Map";
import ItemShareModal from "./ItemShareModal";
import toast, { Toaster } from "react-hot-toast";
import { resetShareState } from "../../../../redux/post/post.action";
import Avatar from '../../../../constants/images/Avatar.png'

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
  const user = useSelector((state) => state.users.user);
  const listReviews = useSelector((state) => state.reviews);
  const order = useSelector((state) => state.orders.orderItem);
  const share = useSelector((state) => state.posts.share);
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
      dispatch(getOneOrderByItem(currentUser, item.id));
    }
  }, []);

  useEffect(() => {
    if (!isEqual(share, {})) {
      share.success
        ? toast.success("Post shared!")
        : toast.error("An error occured :(");
      dispatch(resetShareState());
    }
  }, [share]);

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
    ? item.apartment.image_urls.map((url) => {
        return { key: url, altText: "Image", src: url };
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
          <Toaster />
          <Col md="12" lg="9" className="mt-4">
            <div
              styleName="body__title"
              className="d-flex justify-content-between mb-5"
            >
              Gallery
              <ItemShareModal username={currentUser} item={item} />
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
              <Col
                sm="12"
                md="5"
                className="d-flex flex-column justify-content-between"
              >
                <TableDetails item={item} />
                {isAuthenticated && currentUser !== item.owner.username && (
                  <ReserveModal
                    item={item}
                    orderItem={order}
                    currentUser={currentUser}
                  />
                )}
              </Col>
              <Col
                sm="12"
                md="7"
                className="d-flex flex-column justify-content-between"
              >
                <div styleName="body__title">Location</div>
                <div>
                  <Map apartment={item.apartment} />
                </div>
              </Col>
            </Row>
            <Card styleName="body__merchant">
              <CardBody>
                <div className="d-flex align-items-center mb-2">
                  <img src={user.avatar_url || Avatar} styleName="body__merchant--avatar" />
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
                      {"Reviews"}
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
                          <Review
                            key={review.id}
                            review={review}
                            isOwner={isOwner}
                          />
                        );
                      })}
                    <CustomPagination
                      totalPages={listReviews.pagination?.total_pages}
                      currentPage={listReviews.pagination?.page}
                      fn={(options) => dispatch(getAllReview(item.id, options))}
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
