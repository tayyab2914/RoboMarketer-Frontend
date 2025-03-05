import { CircleCheck, CircleX, MessageSquareWarning } from "lucide-react";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { MdErrorOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { API_REDO_FEEDBACK, API_SUBMIT_FEEDBACK } from "../../apis/ChatApis";
import {
  setTemporaryLoading,
  setTemporaryResponse,
} from "../../redux/AuthToken/Action";
import { useDispatch } from "react-redux";
import { message } from "antd";

export default function DialogBox({
  type,
  onClose,
  responseId,
  setSubmittedFeedback,
  setLimitEnded,
}) {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const {
    token,
    channel,
    current_account,
    temporary_message,
    temporary_loading,
    facebook_state,
    temporary_response,
  } = useSelector((state) => state.authToken);

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
      const response = await API_SUBMIT_FEEDBACK(token, {
        response_id: responseId,
        feedback_type: type,
        feedback_details: feedback,
      });
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
      const response = await API_REDO_FEEDBACK(token, {
        response_id: responseId,
        is_redo: "False",
        redo_message: feedback,
        channel_id: currentChannelId,
      });
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
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        <div className="flex response-buttons px-4">
          <div className="flex gap-2">
            <span>
              <MessageSquareWarning size={18} />
            </span>
            <h5 className="mb-0" style={{ fontSize: "18px", fontWeight: 600 }}>
              {type === "redo" ? "Redo" : "Feedback"}
            </h5>
          </div>
          <button onClick={onClose} className="close">
            <CgClose size={15} />
          </button>
        </div>
        <div className="border-b py-2"></div>
        <div className="px-4">
          <p className="pt-3 mb-0" style={{ fontWeight: 600 }}>
            Please leave your feedback below
          </p>
          <textarea
            className="border-gray"
            placeholder="Type your feedback ..."
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            autoFocus={true}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <div className="mb-0 select-mess">
            <span>
              <MdErrorOutline className="me-1" size={20} />
            </span>
            <span style={{ fontSize: 13 }}>
              Feedback helps train your Robomarketer to produce better
              performance
            </span>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSubmit}
              className="button accept-button-all-recommendations flex-1"
              disabled={loading}
            >
              <CircleCheck size={15} /> Submit
            </button>
            <button onClick={onClose} className="button deny-button flex-1">
              <CircleX size={15} /> Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
