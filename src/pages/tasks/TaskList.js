import React, { useState, useEffect } from 'react';
import { Card, Row, Button, message, Form, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, markTaskComplete, updateTask, fetchTasks, scheduleTask } from '../../redux/actions/taskActions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import TaskTable from './TaskTable';

const TaskList = ({ view, filter }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const users = useSelector(state => state.users.users);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [form] = Form.useForm();

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
    message.success('Task deleted successfully');
  };

  const handleCompleteTask = (taskId) => {
    dispatch(markTaskComplete(taskId));
    message.success('Task marked as complete');
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (selectedTask) {
        dispatch(updateTask({ ...selectedTask, ...values }));
        if (values.recurring !== 'none') {
          dispatch(scheduleTask(values));
        }
        message.success('Task updated successfully');
      } else {
        dispatch(addTask({ id: Date.now(), ...values }));
        if (values.recurring !== 'none') {
          dispatch(scheduleTask(values));
        }
        message.success('Task added successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
    }).catch(error => {
      message.error('Failed to submit form');
      console.error(error);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedTasks = Array.from(filteredTasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);
  };

  return (
    <Card
      title={<div>{view === 'list' ? 'Task List' : 'Task Board'}</div>}
      extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>Add Task</Button>}
      className="task-card"
    >
      {view === 'list' ? (
        <TaskTable
          tasks={filteredTasks}
          users={users}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          handleCompleteTask={handleCompleteTask}
        />
      ) : (
        <div className="task-task-board">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks" direction="vertical">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Row gutter={[16, 16]}>
                    {filteredTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <Col
                            xs={24}
                            sm={12}
                            md={8}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              users={users}
                              handleEditTask={handleEditTask}
                              handleDeleteTask={handleDeleteTask}
                              handleCompleteTask={handleCompleteTask}
                            />
                          </Col>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Row>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
      <TaskModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={form}
        users={users}
      />
    </Card>
  );
};

export default TaskList;
