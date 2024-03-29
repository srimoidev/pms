import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import store from "../store/";
//public pages
// import Login from "../views/Login/Login.vue";
import MainLogin from "../views/Login/MainLogin.vue";
import Home from "../views/HomePage/Home.vue";
// import HomePage from "../components/Home.vue";
import HomeProject from "../views/HomePage/Project.vue";
// import SearchProject from "../components/SearchProject.vue";

//non-public, co-using pages
import Github from "../views/Github/Github.vue";
import GoogleCalendar from "../views/GoogleCalendar/GoogleCalendar.vue";
import GoogleDrive from "../views/GoogleDrive/GoogleDrive.vue";
import Profile from "../views/Profile/Profile.vue";
import Trello from "../views/Trello/TrelloBoard.vue";
import Dashboard from "../views/Dashboard.vue";
import ProjectManual from "../views/ProjectManual/ProjectManual.vue";

//student pages
import Student_Meeting from "../views/Student/Meeting/Meeting.vue";
import Student_MeetingDetail from "../views/Student/Meeting/MeetingDetail.vue";
// import Student_Overview from "../views/Student/Overview/Overview.vue";
import Student_Description from "../views/Student/ProjecDescription/Description.vue";

import Student_Project from "../views/Student/Project/Project.vue";
import Student_Documents from "../views/Student/Documents/Documents.vue";
import Student_ProgressionRecord from "../views/Student/ProgressionRecord/ProgressionRecord.vue";
import Student_FormCE from "../views/Student/Documents/FormCE.vue";
import Student_FormPreview from "../views/Student/Documents/FormPreview.vue";
import Student_AllProject from "../views/Student/AllProject/AllProject.vue";
import Student_Exam from "../views/Student/Project/Exam.vue";
//teacher pages
import Teacher_Meeting from "../views/Teacher/Meeting/Meeting.vue";
import Teacher_MeetingDetail from "../views/Teacher/Meeting/MeetingDetail.vue";
// import Teacher_Overview from "../views/Teacher/Overview/Overview.vue";
import Teacher_AllProject from "../views/Teacher/AllProject/AllProject.vue";
import Teacher_ProjectList from "../views/Teacher/ManageProject/ProjectList.vue";
import Teacher_Project from "../views/Teacher/ManageProject/Project.vue";
import Teacher_TestReq from "../views/Teacher/Request/TestRequest.vue";
import Teacher_ApprovementReq from "../views/Teacher/Request/ApprovementRequest.vue";
import Teacher_FormPreview from "../views/Teacher/ManageProject/FormPreview.vue";
import Teacher_AdvisorRequest from "../views/Teacher/Request/AdvisorRequest.vue";
import Teacher_Documents from "../views/Teacher/ManageProject/Documents";
import Teacher_FormCE from "../views/Teacher/ManageProject/FormCE";
import Teacher_NewProjects from "../views/Teacher/Request/NewProjects";
import Teacher_Exam from "../views/Teacher/Exam/Exam.vue";
import Teacher_Exam_Score from "../views/Teacher/Exam/ExamScore";
import Teacher_Exam_Result from "../views/Teacher/Exam/ExamResult";

//App Environment Configuration
import App_Configs from "../views/AppConfigurations/AppConfigurations.vue";
import App_ManageUsers from "../views/AppConfigurations/ManageUsers.vue";

// SEARCH
import SearchPage from "../views/Search/Search.vue";

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
      // {
      //   path: "",
      //   name: "Home",
      //   component: HomePage,
      //   meta: { title: "Home | PMS" }
      // },
      {
        path: "",
        name: "Search",
        component: SearchPage,
        meta: { title: "Search Project | PMS" }
      },
      {
        path: "/login",
        name: "Login",
        component: MainLogin,
        meta: { title: "Login | PMS" }
      },
      {
        path: "/search",
        name: "Search",
        component: SearchPage,
        meta: { title: "Search Page | PMS" }
      }
    ]
  },
  {
    path: "/project",
    name: "SearchResult",
    component: HomeProject,
    meta: { title: "Project | PMS" }
  },
  // {
  //   path: "/project/:id",
  //   name: "SearchResult",
  //   component: HomeProject,
  //   meta: { title: "Project | PMS" }
  // },
  //Student
  {
    path: "/student",
    name: "Student",
    component: Dashboard,
    redirect: "/student/all_project",
    meta: { is_student: true },
    children: [
      // {
      //   path: "overview",
      //   name: "Overview",
      //   component: Student_Overview,
      //   meta: { title: "Overview | PMS" }
      // },
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
        path: "meeting",
        name: "Meeting",
        component: Student_Meeting,
        meta: { title: "Meeting | PMS" }
      },
      {
        path: "meeting/:id",
        name: "MeetingDetail",
        component: Student_MeetingDetail,
        meta: { title: "MeetingDetail | PMS" }
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
        path: "project_manual",
        name: "ProjectManual",
        component: ProjectManual,
        meta: { title: "Project Manual | PMS" }
      },
      {
        path: "project",
        name: "Project",
        component: Student_Project,
        meta: { title: "Project | PMS" }
      },
      {
        path: "documents",
        name: "Documents",
        component: Student_Documents,
        meta: { title: "Documents | PMS" }
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
        name: "Student Form Preview",
        component: Student_FormPreview,
        meta: { title: "Form Preview | PMS" }
      },
      {
        path: "all_project",
        name: "All Project",
        component: Student_AllProject,
        meta: { title: "All Project | PMS" }
      },
      {
        path: "exam",
        name: "Exam",
        component: Student_Exam,
        meta: { title: "Exam | PMS" }
      }
    ]
  },
  //Teacher
  {
    path: "/teacher",
    name: "Teacher",
    meta: { is_teacher: true },
    component: Dashboard,
    redirect: "/teacher/all_project",
    children: [
      // {
      //   path: "overview",
      //   name: "Overview",
      //   component: Teacher_Overview,
      //   meta: { title: "Overview | PMS" }
      // },
      {
        path: "app_configs",
        name: "App Environment Configuration",
        component: App_Configs,
        meta: { title: "App Environment Configuration | PMS" }
      },
      {
        path: "all_project",
        name: "All Projects",
        component: Teacher_AllProject,
        meta: { title: "All Projects | PMS" }
      },
      {
        path: "project_lists",
        name: "Project Lists",
        component: Teacher_ProjectList,
        meta: { title: "Project List | PMS" }
      },
      {
        path: "project",
        name: "Manage Project",
        component: Teacher_Project,
        meta: { title: "Project | PMS" }
      },
      {
        path: "advisor_req",
        name: "Advisor Request",
        component: Teacher_AdvisorRequest,
        meta: { title: "Advisor Request | PMS" }
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
        component: ProjectManual,
        meta: { title: "Project Manual | PMS" }
      },
      {
        path: "form_preview",
        name: "Teacher Form Preview",
        component: Teacher_FormPreview,
        meta: { title: "Form Preview | PMS" }
      },
      {
        path: "meeting",
        name: "Teacher Meeting",
        component: Teacher_Meeting,
        meta: { title: "Meeting | PMS" }
      },
      {
        path: "meeting/:id",
        name: "Meeting Detail",
        component: Teacher_MeetingDetail,
        meta: { title: "MeetingDetail | PMS" }
      },
      {
        path: "documents",
        name: "Document",
        component: Teacher_Documents,
        meta: { title: "Document | PMS" }
      },
      {
        path: "form_ce",
        name: "Teacher Form CE",
        component: Teacher_FormCE,
        meta: { title: "Form CE | PMS" }
      },
      {
        path: "new_projects",
        name: "New Projects",
        component: Teacher_NewProjects,
        meta: { title: "New Projects | PMS" }
      },
      {
        path: "manage_users",
        name: "Manage Users",
        component: App_ManageUsers,
        meta: { title: "Manage Users | PMS" }
      },
      {
        path: "exam",
        name: "Teacher Exam",
        component: Teacher_Exam,
        meta: { title: "Exam | PMS" }
      },
      {
        path: "exam_score",
        name: "Exam Score",
        component: Teacher_Exam_Score,
        meta: { title: "Exam Score | PMS" }
      },
      {
        path: "exam_result",
        name: "Exam Result",
        component: Teacher_Exam_Result,
        meta: { title: "Exam Result | PMS" }
      }
    ]
  },
  //Admin
  {
    path: "/admin",
    name: "Admin",
    meta: { is_admin: true },
    component: Dashboard,
    redirect: "/admin/app_configs",
    children: [
      // {
      //   path: "dashboard",
      //   name: "Dashboard",
      //   component: Admin_Dashboard,
      //   meta: { title: "Dashboard | PMS" }
      // },
      {
        path: "app_configs",
        name: "Admin App Environment Configuration",
        component: App_Configs,
        meta: { title: "App Environment Configuration | PMS" }
      },
      // {
      //   path: "all_project",
      //   name: "All Projects",
      //   component: Teacher_AllProject,
      //   meta: { title: "All Projects | PMS" }
      // },
      {
        path: "project_manual",
        name: "Admin Project Manual",
        component: ProjectManual,
        meta: { title: "Project Manual | PMS" }
      },
      {
        path: "form_preview",
        name: "Form Preview",
        component: Teacher_FormPreview,
        meta: { title: "Form Preview | PMS" }
      },
      {
        path: "manage_users",
        name: "Admin Manage Users",
        component: App_ManageUsers,
        meta: { title: "Manage Users | PMS" }
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
  const loggedIn = JSON.parse(localStorage.getItem("user"));

  // /***
  //  * User_typeID 1 : Student
  //  * USer_typeID 2 : Teacher
  //  * User_typeID 3 : Instructor
  //  */

  if (loggedIn) {
    const userTypeID = JSON.parse(atob(loggedIn.token.split(".")[1])).UserTypeID;
    //login ครั้งละ 60 นาที
    if (new Date().getTime() < loggedIn.expiry) {
      if (to.matched.some(record => record.meta.is_student)) {
        if (userTypeID == 1) {
          next();
        } else {
          next("/");
        }
      } else if (to.matched.some(record => record.meta.is_teacher)) {
        if (userTypeID == 2 || userTypeID == 3 || userTypeID == 5) {
          next();
        } else {
          next("/");
        }
      } else if (to.matched.some(record => record.meta.is_admin)) {
        if (userTypeID == 4) {
          next();
        } else {
          next("/");
        }
      } else {
        next();
      }
    } else {
      localStorage.clear();
      store.dispatch("authentication/logout");
      store.dispatch("user/clearUserDate");
      return next("/login");
    }
  } else {
    const publicPages = ["/", "/search", "/login", "/about", "/project"];
    if (!publicPages.includes(to.path)) {
      next("/login");
    } else {
      next();
    }
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
  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(el => el.parentNode.removeChild(el));

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
