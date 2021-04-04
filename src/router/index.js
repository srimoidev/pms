import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";

//public pages
// import Login from "../views/Login/Login.vue";
import MainLogin from "../views/Login/MainLogin.vue";
import Home from "../views/HomePage/Home.vue";
import SearchProject from "../components/SearchProject.vue";

//non-public, co-using pages
import Github from "../views/Github/Github.vue";
import GoogleCalendar from "../views/GoogleCalendar/GoogleCalendar.vue";
import GoogleDrive from "../views/GoogleDrive/GoogleDrive.vue";
import Profile from "../views/Profile/Profile.vue";
import Trello from "../views/Trello/TrelloBoard.vue";
import Dashboard from "../views/Dashboard.vue";

//student pages
import Student_Appointment from "../views/Student/Appointment/Appointment.vue";
import Student_Overview from "../views/Student/Overview/Overview.vue";
import Student_Description from "../views/Student/ProjecDescription/Description.vue";
import Student_ProjectManual from "../views/Student/ProjectManual/ProjectManual.vue";
import Student_ManageGroup from "../views/Student/ManageGroup/ManageGroup.vue";
import Student_ManageProject from "../views/Student/ManageProject/ManageProject.vue";
import Student_ProgressionRecord from "../views/Student/ProgressionRecord/ProgressionRecord.vue";
import Student_FormCE from "../views/Student/ManageProject/FormCE.vue";
import Student_FormPreview from "../views/Student/ManageProject/FormPreview.vue";

//teacher pages
import Teacher_Overview from "../views/Teacher/Overview/Overview.vue";
import Teacher_ManageGroup from "../views/Teacher/ManageGroup/ManageGroup.vue";
import Teacher_ManageProject from "../views/Teacher/ManageProject/ManageProject.vue";
import Teacher_TestReq from "../views/Teacher/Request/TestRequest.vue";
import Teacher_ApprovementReq from "../views/Teacher/Request/ApprovementRequest.vue";
import Teacher_ProjectManual from "../views/Teacher/ProjectManual/ProjectManual.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      title: "Home | PMS",
      metaTags: [
        {
          name: "description",
          content: "The home page of our example app."
        },
        {
          property: "og:description",
          content: "The home page of our example app."
        }
      ]
    },
    children: [
      {
        path: "",
        name: "Home",
        component: SearchProject,
        meta: { title: "Home | PMS" }
      },
      {
        path: "search",
        name: "Search",
        component: SearchProject,
        meta: { title: "Search Project | PMS" }
      },
      {
        path: "/login",
        name: "Login",
        component: MainLogin,
        meta: { title: "Login | PMS" }
      }
    ]
  },

  {
    path: "/student",
    name: "Student",
    meta: { guest: false },
    component: Dashboard,
    redirect: "/student/overview",
    children: [
      {
        path: "overview",
        name: "Overview",
        component: Student_Overview,
        meta: { title: "Overview | PMS" }
      },
      {
        path: "description",
        name: "Description",
        component: Student_Description,
        meta: { title: "Project Descriptions | PMS" }
      },
      {
        path: "profile",
        name: "Profile",
        component: Profile,
        meta: { title: "Profile | PMS" }
      },
      {
        path: "calendar",
        name: "Calendar",
        component: GoogleCalendar,
        meta: { title: "Google Calendar | PMS" }
      },
      {
        path: "appointment",
        name: "Appointment",
        component: Student_Appointment,
        meta: { title: "Appointment | PMS" }
      },
      {
        path: "github",
        name: "Github",
        component: Github,
        meta: { title: "Github | PMS" }
      },
      {
        path: "trello",
        name: "Trello",
        component: Trello,
        meta: { title: "Trello | PMS" }
      },
      {
        path: "drive",
        name: "Drive",
        component: GoogleDrive,
        meta: { title: "Google Drive | PMS" }
      },
      {
        path: "assocdoc",
        name: "ProjectManual",
        component: Student_ProjectManual,
        meta: { title: "Associated Documents | PMS" }
      },
      {
        path: "manage_group",
        name: "Manage Group",
        component: Student_ManageGroup,
        meta: { title: "Topic Proposal | PMS" }
      },
      {
        path: "manage_project",
        name: "Manage Project",
        component: Student_ManageProject,
        meta: { title: "Manage Project | PMS" }
      },
      {
        path: "progression_record",
        name: "Progression Record",
        component: Student_ProgressionRecord,
        meta: { title: "Progression Record | PMS" }
      },
      {
        path: "form_ce",
        name: "Form CE",
        component: Student_FormCE,
        meta: { title: "Form CE | PMS" }
      },
      {
        path: "form_preview",
        name: "Form Preview",
        component: Student_FormPreview,
        meta: { title: "Form Preview | PMS" }
      }
    ]
  },

  {
    path: "/teacher",
    name: "Teacher",
    meta: { guest: false },
    component: Dashboard,
    redirect: "/teacher/overview",
    children: [
      {
        path: "overview",
        name: "Overview",
        component: Teacher_Overview,
        meta: { title: "Overview | PMS" }
      },
      {
        path: "manage_group",
        name: "Manage Group",
        component: Teacher_ManageGroup,
        meta: { title: "Manage Group | PMS" }
      },
      {
        path: "manage_project",
        name: "Manage Project",
        component: Teacher_ManageProject,
        meta: { title: "Topic Proposal | PMS" }
      },
      {
        path: "test_req",
        name: "Test Request",
        component: Teacher_TestReq,
        meta: { title: "Test Request | PMS" }
      },
      {
        path: "approvement_req",
        name: "Approvement Request",
        component: Teacher_ApprovementReq,
        meta: { title: "Documents Approvement Request | PMS" }
      },
      {
        path: "project_manual",
        name: "Project Manual",
        component: Teacher_ProjectManual,
        meta: { title: "Project Manual | PMS" }
      }
    ]
  },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/search", "/login", "/about"];
  let restrictedPage = [];

  const authRequired = publicPages.includes(to.path);
  const loggedIn = JSON.parse(sessionStorage.getItem("user"));
  let role;
  if (loggedIn) {
    if (loggedIn.User_ID == 3) {
      role = "Student";
    } else {
      role = "Advisor";
    }
  }
  switch (role) {
    case "Advisor":
      restrictedPage = ["student", "admin"];
      break;
    case "Instructor":
      restrictedPage = ["student", "admin"];
      break;
    case "Student":
      restrictedPage = ["teacher", "admin"];
      break;
    default:
      break;
  }
  if (!authRequired && !loggedIn) {
    return next("/login");
  } else if (["/login"].includes(to.path) && loggedIn) {
    return next("/");
  } else if (restrictedPage.includes(to.path.split("/")[1])) {
    if (role == "Advisor") return next("/teacher");
    else if (role == "Instructor") return next("/teacher");
    else if (role == "Student") return next("/student");
    else return next("/");
  }

  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);
  // const previousNearestWithMeta = from.matched
  //   .slice()
  //   .reverse()
  //   .find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router;
