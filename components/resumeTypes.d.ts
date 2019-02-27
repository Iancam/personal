export type content = {
  skills: skill[];
  education: education[];
  work: work[];
  projects: work[];
};

export type skill = {
  type: "skill";
  name: string;
  level?: string;
  keywords?: string[];
};
export type dates = {
  startDate: string;
  endDate?: string;
};
export type location = {
  type: "location";
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
};
export type work = {
  type: "work";
  title?: string;
  position: string;
  company: string;
  website?: string;
  summary?: string;
  highlights: string[];
} & dates;

export type education = {
  type: "education";
  institution: string;
  area: string;
  studyType: string;
  gpa?: number;
} & dates;

export type frontMatter = {
  type: "basics" | "contact";
  name: string;
  picture: string;
  label: string;
  email: string;
  phone: string;
  website: string;
  location: location;
  profiles: profile[];
};

export type profile = {
  network: string;
  url: string;
  username: string;
};

interface dtToJSX {
  [s: string]: {
    [s: string]: (t: any) => JSX.Element;
  };
}
export type supportedType = work | education | skill | frontMatter; //& { type: string };
export type sidebarT = {
  skills: skill[];
  education: education;
  contact: frontMatter;
};
