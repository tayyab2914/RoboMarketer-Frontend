import { MessageSquareWarning } from "lucide-react";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { API_REDO_FEEDBACK, API_SUBMIT_FEEDBACK } from "../../apis/ChatApis";
import {
  setTemporaryLoading,
  setTemporaryResponse,
} from "../../redux/AuthToken/Action";
import { useDispatch } from "react-redux";
import { Button, Input, message, Modal } from "antd";
import MyIcon from "../../components/Icon/MyIcon";
import "./../../components/Modals/styles/ModalStyles.css";

export default function DialogBox({ type, onClose, responseId, setSubmittedFeedback, setLimitEnded, isVisible }) {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token, channel, } = useSelector((state) => state.authToken);

  // Function to close the dialog

  const dispatch = useDispatch();

  const handleSubmit = () => {
    setError("");

    if (feedback.trim().length < 2) {
      setError("Feedback must be at least 2 characters.");
      return;
    } else {
      setError("");
      if (type != "redo") {
        submitResponse(feedback);
      } else {
        redoResponse(feedback);
      }
    }
  };

  const submitResponse = async (feedback) => {
    setLoading(true);
    try {
      const response = await API_SUBMIT_FEEDBACK(token, { response_id: responseId, feedback_type: type, feedback_details: feedback, });
      message.success("Feedback Sent Successfully");

      setLoading(false);
      setSubmittedFeedback({ id: responseId, type: type });
      onClose();
    } catch (error) {
      setLoading(false);
      onClose();
    }
  };
  const redoResponse = async (feedback) => {
    // setLoading(true);
    const currentChannelId = channel?.id;

    dispatch(setTemporaryLoading(true));
    onClose();

    try {
      const response = await API_REDO_FEEDBACK(token, { response_id: responseId, is_redo: "False", redo_message: feedback, channel_id: currentChannelId, });
      // setLoading(false);
      if (response?.limit_end) {
        setLimitEnded(true);
      } else {
        dispatch(setTemporaryResponse(response));
        setSubmittedFeedback({ id: "", type: type });
        dispatch(setTemporaryLoading(false));
      }
    } catch (error) {
      dispatch(setTemporaryLoading(false));

      // setLoading(false);
      // onClose();
    }
  };

  return (
    <Modal className="" title={false} centereda visible={isVisible} onCancel={onClose} closable={false} footer={null} >
      <div className="custom-modal-header">
        <span className="modal-header">
          <MessageSquareWarning size={18} style={{ marginRight: "8px" }} />
          {type === "redo" ? "Redo" : "Feedback"}
        </span>
        <span>
          <MyIcon type={"close_icon"} onClick={onClose} size="lg" className="close-icon" />
        </span>
      </div>

      <div className="modal-content">
        <p className="modal-field-label-block">
          Please leave your feedback below
        </p>
        <Input.TextArea rows={5} className="mb-0" placeholder="Type your feedback .." value={feedback} onChange={(e) => setFeedback(e.target.value)} autoFocus={true} />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        
      </div>
        <div className="mb-0 select-mess p-3 pb-0" style={{display:"block",borderTop:"1px solid #e6eaed"}}>
            <span> <MdErrorOutline className="me-1" size={20} />  </span>
            <span style={{ fontSize: 13 }}> Feedback helps train your Robomarketer to produce better performance </span>
          </div>
        <div className="modal-actions" style={{border:"none"}} key="footer">
          
          <span className="btn-2">
            <Button type="primary" onClick={handleSubmit} className="create-btn" > {" "} <MyIcon type={"tick"} /> Save{" "} </Button>
          </span>
          <span className="btn-1">
            <Button onClick={onClose} className="cancel-btn"> {" "} <MyIcon type={"cross_red"} /> Cancel{" "} </Button>{" "}
          </span>
        </div>
    </Modal>
  );
}
