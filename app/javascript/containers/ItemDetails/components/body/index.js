import React, { useEffect } from "react";
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
  Row,
} from "reactstrap";
import DefaultImage from "../../../../constants/images/DefaultImage.png";
import DefaultAvatar from "../../../../constants/images/DefaultAvatar.png";
import styled from "styled-components";
import TableDetails from "./TableDetails";
import StarIcon from "@material-ui/icons/Star";
import Comment from "../../../../components/Comment";
import CustomPagination from "../../../../components/Pagination";
import ReserveModal from "../ReserveModal";
import { MySlider } from "../../../../components/Slider";
import { getOneUser } from "../../../../redux/user/user.action";

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

const DetailBody = ({ item }) => {
  console.log(item)
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    if (item) {
      dispatch(getOneUser(item.owner.username));
    }
  }, []);

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
                <ReserveModal item={item} />
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
                      .map((index) => (
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

                {"Comments"}

                <Input
                  id="comment"
                  name="comment"
                  type="textarea"
                  placeholder="Write down your comment"
                  className="mt-3"
                  rows="5"
                />
                <Button color="danger" className="mt-3 mb-5">
                  Post
                </Button>

                <hr />

                <Comment />
                <CustomPagination
                  url={`/items/${item.id}/comments`}
                  totalPages={4}
                  currentPage={1}
                />
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
