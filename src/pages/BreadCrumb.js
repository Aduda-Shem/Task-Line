import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const BreadcrumbComponent = (props) => {
  const navigate = useNavigate();

  const handleBreadcrumbClick = (url, state) => {
    navigate(url, { state });
  };

  return (
    <Row style={{ padding: '10px 0', backgroundColor: '#f0f2f5', borderBottom: '1px solid #d9d9d9' }}>
      <Col xs={24} md={12}>
        <h4 className="mb-sm-0 font-size-18" style={{ marginBottom: 0 }}>{props.breadcrumbItem}</h4>
      </Col>
      <Col xs={24} md={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={props.link}>
              <HomeOutlined />
              <span style={{ marginLeft: '8px' }}>{props.title}</span>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <Link to={props.breadcrumbItemUrl ?? "#"} onClick={() => handleBreadcrumbClick(props.breadcrumbItemUrl ?? "#", props.pageParams)}>
              {props.breadcrumbItem}
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>
    </Row>
  );
};

BreadcrumbComponent.propTypes = {
  breadcrumbItem: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  breadcrumbItemUrl: PropTypes.string,
  pageParams: PropTypes.object,
};

export default BreadcrumbComponent;
