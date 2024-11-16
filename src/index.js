import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { BUTTON_COLORS, CHECKBOX_COLORS, FORM_COLORS, INPUT_COLORS, NOTIFICATION_COLORS,PAGINATION_COLORS, POPCONFIRM_COLORS, PROGRESS_COLORS, RADIO_COLORS, SELECT_COLORS, SWITCH_COLORS, TAB_COLORS, UPLOAD_COLORS } from "./utils/AntdColors";
// import { BUTTON, INPUT, POPOVER, TOOLTIP } from "./components/Generic/Colors";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider
    theme={{
      components: {
        Form:FORM_COLORS,
        Input:INPUT_COLORS,
        Notification:NOTIFICATION_COLORS,
        Pagination:PAGINATION_COLORS,
        Select:SELECT_COLORS,
        Radio:RADIO_COLORS,
        Switch:SWITCH_COLORS,
        Upload:UPLOAD_COLORS,
        Popconfirm:POPCONFIRM_COLORS,
        Progress:PROGRESS_COLORS,
        Button:BUTTON_COLORS,
        Checkbox:CHECKBOX_COLORS,
      },
    }}
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ConfigProvider>
);

reportWebVitals();
