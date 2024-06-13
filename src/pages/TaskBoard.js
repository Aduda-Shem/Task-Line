import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask, markTaskComplete } from '../redux/actions/taskActions';
import { Typography, Col, Row, Button, Modal, Form, Input, Select, Card, Tag, Pagination } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { EditOutlined, DeleteOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const TaskBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const users = useSelector(state => state.users.users);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [form] = Form.useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleEditTask = (task) => {
    setSelectedTask(task);
    form.setFieldsValue(task);
    setIsModalVisible(true);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleCompleteTask = (taskId) => {
    dispatch(markTaskComplete(taskId));
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (selectedTask) {
        dispatch(updateTask({ ...selectedTask, ...values }));
      } else {
        dispatch(addTask({ id: Date.now(), ...values }));
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    // Here you can dispatch an action to update the task order in the state
    // dispatch(updateTaskOrder(reorderedTasks));
  };

  const getPaginatedTasks = (tasks) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return tasks.slice(startIndex, startIndex + itemsPerPage);
  };

  const renderTasks = (status) => {
    const columnTasks = tasks.filter(task => {
      if (status === 'To Do') return !task.completed;
      if (status === 'Done') return task.completed;
      return [];
    });

    return getPaginatedTasks(columnTasks).map((task, index) => (
      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
        {(provided) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            title={task.title}
            style={{
              marginBottom: '16px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              borderRadius: '8px',
              background: '#ffffff',
            }}
            actions={[
              <EditOutlined onClick={() => handleEditTask(task)} />,
              <DeleteOutlined onClick={() => handleDeleteTask(task.id)} />,
              !task.completed && <CheckOutlined onClick={() => handleCompleteTask(task.id)} />,
            ]}
          >
            <p>User: {users.find(user => user.id === task.userId)?.name}</p>
            <Tag color={task.completed ? 'green' : 'red'}>
              {task.completed ? 'Completed' : 'Pending'}
            </Tag>
          </Card>
        )}
      </Draggable>
    ));
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>Add Task</Button>
</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Droppable droppableId="toDo">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Title level={4} style={{ textAlign: 'center', marginBottom: '20px' }}>To Do</Title>
                  {renderTasks('To Do')}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
          <Col span={12}>
            <Droppable droppableId="done">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Title level={4} style={{ textAlign: 'center', marginBottom: '20px' }}>Done</Title>
                  {renderTasks('Done')}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
        </Row>
      </DragDropContext>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Pagination
          current={currentPage}
          total={tasks.length}
          pageSize={itemsPerPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </Row>
      <Modal title="Add/Edit Task" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the task title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="User" name="userId" rules={[{ required: true, message: 'Please select the user!' }]}>
            <Select>
              {users.map(user => (
                <Option key={user.id} value={user.id}>{user.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Completed" name="completed" valuePropName="checked">
            <Input type="checkbox" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskBoard;
