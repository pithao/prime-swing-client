import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

const surveySlice = (set, get) => ({
  // -------------------- Dance Survey --------------------
  danceForm: {
    anonymous: true,
    name: '',
    email: '',
    contactPermission: false,
    dancerRole: '',
    age: '',
    gender: '',
    zipCode: '',
    danceFeedback: '',
    danceImprovement: '',
    lessonComments: '',
    djComments: '',
    generalComments: '',
    danceRatings: {
      satisfaction: 3,
      instructor: 3,
      lessonSatisfaction: 3,
      recommendationLikelihood: 3,
      djSatisfaction: 3,
      locationSatisfaction: 3,
      scheduleSatisfaction: 3,
    },
  },
  setDanceForm: (data) => set({ danceForm: data }),
  resetDanceForm: () =>
    set((state) => ({
      danceForm: {
        ...state.danceForm,
        anonymous: true,
        name: '',
        email: '',
        contactPermission: false,
        dancerRole: '',
        age: '',
        gender: '',
        zipCode: '',
        danceFeedback: '',
        danceImprovement: '',
        lessonComments: '',
        djComments: '',
        generalComments: '',
        danceRatings: {
          satisfaction: 3,
          instructor: 3,
          lessonSatisfaction: 3,
          recommendationLikelihood: 3,
          djSatisfaction: 3,
          locationSatisfaction: 3,
          scheduleSatisfaction: 3,
        },
      },
    })),

  // -------------------- Class Survey --------------------
  classForm: {
    anonymous: true,
    name: '',
    email: '',
    contactPermission: false,
    dancerRole: '',
    age: '',
    gender: '',
    zipCode: '',
    classFeedback: '',
    classImprovement: '',
    leadInstructorComments: '',
    followInstructorComments: '',
    additionalTopics: '',
    generalComments: '',
    classRatings: {
      satisfaction: 3,
      leadInstructor: 3,
      followInstructor: 3,
      retakeLikelihood: 3,
      materialSatisfaction: 3,
      locationSatisfaction: 3,
      scheduleSatisfaction: 3,
    },
  },
  setClassForm: (data) => set({ classForm: data }),
  resetClassForm: () =>
    set((state) => ({
      classForm: {
        ...state.classForm,
        anonymous: true,
        name: '',
        email: '',
        contactPermission: false,
        dancerRole: '',
        age: '',
        gender: '',
        zipCode: '',
        classFeedback: '',
        classImprovement: '',
        leadInstructorComments: '',
        followInstructorComments: '',
        additionalTopics: '',
        generalComments: '',
        classRatings: {
          satisfaction: 3,
          leadInstructor: 3,
          followInstructor: 3,
          retakeLikelihood: 3,
          materialSatisfaction: 3,
          locationSatisfaction: 3,
          scheduleSatisfaction: 3,
        },
      },
    })),

  // -------------------- Event Survey --------------------
  eventForm: {
    anonymous: true,
    name: '',
    email: '',
    contactPermission: false,
    dancerRole: '',
    age: '',
    gender: '',
    zipCode: '',
    eventFeedback: '',
    eventImprovement: '',
    proComments: '',
    danceComments: '',
    workshopComments: '',
    djComments: '',
    additionalWorkshops: '',
    generalComments: '',
    dancesAttended: '',
    workshopsAttended: '',
    eventRatings: {
      eventSatisfaction: 3,
      pro: 3,
      dj: 3,
      workshop: 3,
      recommendationLikelihood: 3,
      workshopSatisfaction: 3,
      locationSatisfaction: 3,
      scheduleSatisfaction: 3,
    },
  },
  setEventForm: (data) => set({ eventForm: data }),
  resetEventForm: () =>
    set((state) => ({
      eventForm: {
        ...state.eventForm,
        anonymous: true,
        name: '',
        email: '',
        contactPermission: false,
        dancerRole: '',
        age: '',
        gender: '',
        zipCode: '',
        eventFeedback: '',
        eventImprovement: '',
        proComments: '',
        danceComments: '',
        workshopComments: '',
        djComments: '',
        additionalWorkshops: '',
        generalComments: '',
        dancesAttended: '',
        workshopsAttended: '',
        eventRatings: {
          eventSatisfaction: 3,
          pro: 3,
          dj: 3,
          workshop: 3,
          recommendationLikelihood: 3,
          workshopSatisfaction: 3,
          locationSatisfaction: 3,
          scheduleSatisfaction: 3,
        },
      },
    })),

  // -------------------- Location Survey --------------------
  locationForm: {
    anonymous: true,
    name: '',
    email: '',
    contactPermission: false,
    dancerRole: '',
    age: '',
    gender: '',
    zipCode: '',
    locationFeedback: '',
    locationImprovement: '',
    locationRecommendations: '',
    generalComments: '',
    locationRatings: {
      buildingSatisfaction: 3,
      danceFloorSatisfaction: 3,
      parkingSatisfaction: 3,
      importanceOfKeepingSameSchedule: 3,
      importanceOfKeepingSameDanceSchedule: 3,
      importanceOfKeepingSameEventSchedule: 3,
    },
    moveOutsideStPaul: '',
    locationChallenges: '',
    locationSafety: '',
    locationChallengesExplanation: '',
    locationSafetyExplanation: '',
  },
  setLocationForm: (data) => set({ locationForm: data }),
  resetLocationForm: () =>
    set((state) => ({
      locationForm: {
        ...state.locationForm,
        anonymous: true,
        name: '',
        email: '',
        contactPermission: false,
        dancerRole: '',
        age: '',
        gender: '',
        zipCode: '',
        locationFeedback: '',
        locationImprovement: '',
        locationRecommendations: '',
        generalComments: '',
        locationRatings: {
          buildingSatisfaction: 3,
          danceFloorSatisfaction: 3,
          parkingSatisfaction: 3,
          importanceOfKeepingSameSchedule: 3,
          importanceOfKeepingSameDanceSchedule: 3,
          importanceOfKeepingSameEventSchedule: 3,
        },
        moveOutsideStPaul: '',
        locationChallenges: '',
        locationSafety: '',
        locationChallengesExplanation: '',
        locationSafetyExplanation: '',
      },
    })),

  // -------------------- Responses & Fetch Functions --------------------
  danceResponses: [],
  classResponses: [],
  eventResponses: [],
  locationResponses: [],

  fetchDanceResponses: async () => {
    const snapshot = await getDocs(collection(db, "danceSurvey"));
    set({ danceResponses: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) });
  },

  fetchClassResponses: async () => {
    const snapshot = await getDocs(collection(db, "classSurvey"));
    set({ classResponses: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) });
  },

  fetchEventResponses: async () => {
    const snapshot = await getDocs(collection(db, "eventSurvey"));
    set({ eventResponses: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) });
  },

  fetchLocationResponses: async () => {
    const snapshot = await getDocs(collection(db, "locationSurvey"));
    set({ locationResponses: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) });
  },
});

export default surveySlice;
