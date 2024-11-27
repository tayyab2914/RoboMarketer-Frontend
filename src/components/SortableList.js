import React from 'react';
import { Col } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MyIcon from './Icon/MyIcon';
import { GET_METRIC_NAME_FROM_KEY } from '../utils/Methods';

const MyScrollableList = ({ localSelectedMetrics, handleRemoveMetric, onDragEnd }) => {
  return (
    <Col xs={12} className="modal-scrollable"  style={{padding:"20px 20px 20px 15px !important"}}>
      <p className="modal-title">Selected Metrics</p>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {localSelectedMetrics?.map((metric, index) => (
                <Draggable key={metric} draggableId={metric} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps} // Attaching to the drag handle (ellipsis)
                      className="selected-metric-main"
                    >
                      <span className="selected-metric-elipsis" style={{ cursor: 'move' }}>
                        <MyIcon type="elipsis" />
                      </span>
                      <span className="selected-metric-name">{GET_METRIC_NAME_FROM_KEY(metric)}</span>
                      <span
                        className="selected-metric-cross"
                        onClick={() => handleRemoveMetric(metric)} // Clicking the cross will remove the metric
                      >
                        <MyIcon type="cross" size="xs" />
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

export default MyScrollableList;
