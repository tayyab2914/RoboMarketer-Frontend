import React from 'react';
import { Col, Popconfirm } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MyIcon from '../../components/Icon/MyIcon';

const ScrollableCategories = ({ localSelectedMetrics,handleDelete,handleEditCategoryClick, onDragEnd,onClose,setCategory }) => {
  return (
    <Col>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {localSelectedMetrics?.map((metric, index) => (
                <Draggable
                    key={metric.category_id} // Ensure category_id is unique and used here
                    draggableId={metric.category_id.toString()} // Use category_id as string here
                    index={index}
                >
                    {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="category-btn"
                    >
                        <span onClick={() => {setCategory(metric); onClose();}} className='category-name'>
                        <MyIcon type={"category"} style={{marginRight:"5px",height:"14px"}} />{metric?.category_name}
                        </span>
                        <span className="category-btn-icons">
                        <MyIcon type={"arrow_up_down"} style={{ height: "20px", cursor: 'move' }} />
                        <MyIcon type={"sa_edit"} style={{ height: "25px", cursor: 'pointer' }} onClick={() => {handleEditCategoryClick(metric)}} />
                        <Popconfirm title="Are you sure you want to delete this category?" onConfirm={() => handleDelete(metric?.category_id)} okText="Yes" cancelText="No">
                            <MyIcon type={"sa_delete"} style={{ height: "25px", cursor: 'pointer' }} />
                        </Popconfirm>
                        </span>
                    </div>
                    )}
                </Draggable>
                ))}


              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Col>
  );
};

export default ScrollableCategories;
