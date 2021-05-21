import * as App from "./App";
import * as Document from "./Document";
import * as Form from "./Form";
import * as Meeting from "./Meeting";
import * as Notification from "./Notification";
import * as Project from "./Project";
import * as Section from "./Section";
import * as User from "./User";
import * as Advisor from "./Advisor";

export default {
  install(Vue) {
    Vue.prototype.App = App;
    Vue.prototype.Document = Document;
    Vue.prototype.Form = Form;
    Vue.prototype.Meeting = Meeting;
    Vue.prototype.Notification = Notification;
    Vue.prototype.Project = Project;
    Vue.prototype.Section = Section;
    Vue.prototype.User = User;
    Vue.prototype.Advisor = Advisor;
  }
};
