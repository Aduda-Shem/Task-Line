// components/FAQSection.js

import React from 'react';
import { Collapse, Typography, Row, Col } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const faqData = [
  { question: 'What services do you offer?', answer: 'We offer a wide range of services including task management, department management, and employee management.' },
  { question: 'How can I contact you?', answer: 'You can contact us via email at info@company.com or call us at (123) 456-7890.' },
  { question: 'What are your pricing plans?', answer: 'We offer three pricing plans: Basic ($10/month), Standard ($20/month), and Premium ($30/month).' },
];

const FAQSection = () => (
  <>
    <Title level={2} style={{ marginBottom: '40px', fontWeight: '700', textAlign: 'center' }}>Frequently Asked Questions</Title>
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12}>
        <Collapse accordion bordered={false} defaultActiveKey={['0']}>
          {faqData.map((faq, index) => (
            <Panel
              header={
                <span style={{ fontWeight: '600', fontSize: '16px', display: 'flex', alignItems: 'center' }}>
                  <QuestionCircleOutlined style={{ marginRight: '8px', color: '#08c' }} />
                  {faq.question}
                </span>
              }
              key={index}
              style={{
                marginBottom: '16px',
                border: '1px solid #e8e8e8',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <Paragraph style={{ padding: '16px', margin: 0, backgroundColor: '#f9f9f9', borderRadius: '0 0 8px 8px' }}>
                {faq.answer}
              </Paragraph>
            </Panel>
          ))}
        </Collapse>
      </Col>
    </Row>
  </>
);

export default FAQSection;
