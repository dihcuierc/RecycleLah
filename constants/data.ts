import icons from "./icons";
import { ImageSourcePropType } from "react-native";

export type History = {
  id: number;
  type: string;
  location: string;
  date: string;
  weight: string;
  points_earned: number;
};

export type Profile = {
  id: string;
  username: string;
  points: number;
  level: number;
  CO2: number;
  Energy: number;
  avatar_url: string;
  badges: number;
};

export type Bin = {
  distance: number;
  id: number;
  address: string;
  rate: number;
  collecting: string;
  capacity: number;
  status: string;
  starred: boolean;
  longitude: number;
  latitude: number;
};

export type Stat = {
  id: number;
  name: string;
  color: string;
  icon: ImageSourcePropType;
  steps: { key: number; value: string }[];
};

export const bins = [
  {
    id: 1,
    address: "Yishun Street 12 Blk 112",
    distance: 0,
    rate: 5,
    collecting: "General",
    capacity: 23,
    status: "Online",
    starred: true,
    longitude: 103.836807,
    latitude: 1.43303,
  },
  {
    id: 2,
    address: "Bishan Street 12 Blk 125",
    distance: 0,
    rate: 35,
    collecting: "Textile",
    capacity: 110,
    status: "Online",
    starred: false,
    longitude: 103.851555,
    latitude: 1.346919,
  },
  {
    id: 3,
    address: "Tampines Avenue 5 Blk 402",
    distance: 0,
    rate: 3,
    collecting: "Paper",
    capacity: 52,
    status: "Online",
    starred: false,
    longitude: 103.941264,
    latitude: 1.352122,
  },
  {
    id: 4,
    address: "Bishan Street 13 Blk 456",
    distance: 0,
    rate: 20,
    collecting: "Paper",
    capacity: 86,
    status: "Offline",
    starred: false,
    longitude: 103.850067,
    latitude: 1.349086,
  },
  {
    id: 5,
    address: "Meiling Street Blk 148",
    distance: 0,
    rate: 25,
    collecting: "E-waste",
    capacity: 125,
    status: "Full",
    starred: true,
    longitude: 103.804408,
    latitude: 1.294614,
  },
];

export const filters = [
  { id: 1, name: "All" },
  { id: 2, name: "Starred" },
  { id: 3, name: "General" },
  { id: 4, name: "Paper" },
  { id: 5, name: "E-waste" },
  { id: 6, name: "Plastic" },
  { id: 7, name: "Textile" },
];

export const wasteStats = [
  {
    id: 1,
    name: "Paper",
    color: "#27DDE6",
    icon: icons.paper,
    steps: [
      {
        key: 1,
        value:
          "Recycle newspaper, magazines, packaging cardboard, envelopes, office paper and any other paper of this type. Ensure that the paper is dry and clean, as wet or contaminated paper cannot be recycled effectively.",
      },
      {
        key: 2,
        value:
          "Remove all dirty or greasy paper material. Avoid recycling contaminated paper as it can spoil the entire batch of uncontaminated paper in the bin. Examples include pizza boxes with food residue or napkins used for cleaning.",
      },
      {
        key: 3,
        value:
          "Place all uncontaminated, recyclable paper material in a plastic bag and place it in the nearest SGRecycle bin or Bloo Bin near you. Make sure the bag is securely closed to prevent any paper from blowing away or getting wet.",
      },
    ],
  },
  {
    id: 2,
    name: "Textile",
    color: "#F2C34E",
    icon: icons.textile,
    steps: [
      {
        key: 1,
        value:
          "Donate clean and wearable clothing to charity organizations or textile recycling bins. Ensure that the clothes are in good condition, free of stains, and without major damages like large tears or holes.",
      },
      {
        key: 2,
        value:
          "Repurpose old textiles into rags or craft materials. For instance, old T-shirts can be cut into cleaning rags or used in DIY projects like quilts or pillow stuffing.",
      },
      {
        key: 3,
        value:
          "Drop off worn-out textiles at designated textile recycling centers. These centers can often recycle materials that cannot be reused, converting them into insulation or other industrial materials.",
      },
    ],
  },
  {
    id: 3,
    name: "Plastic",
    color: "#AE7AD7",
    icon: icons.plastic,
    steps: [
      {
        key: 1,
        value:
          "Rinse bottles to remove any residual liquid or food. This helps to prevent contamination and reduces odors that can attract pests. Use water to give the bottles a quick rinse before placing them in the recycling bin.",
      },
      {
        key: 2,
        value:
          "Remove caps and labels before recycling if possible. Some recycling centers require bottles to be separated from their caps, as they are often made from different types of plastic.",
      },
      {
        key: 3,
        value:
          "Place clean, empty bottles in the appropriate recycling bin. Ensure the bin is designated for plastics if your local recycling program separates materials. This helps to ensure the bottles are processed correctly.",
      },
    ],
  },
  {
    id: 4,
    name: "General",
    color: "#4DA5FF",
    icon: icons.glass,
    steps: [
      {
        key: 1,
        value:
          "Separate general waste from recyclable materials. Ensure that recyclable items like paper, plastic, and metals are placed in their respective recycling bins.",
      },
      {
        key: 2,
        value:
          "Dispose of general waste in a tightly sealed bag to prevent spillage. This helps to maintain cleanliness and hygiene, especially for waste that can rot and produce unpleasant odors.",
      },
      {
        key: 3,
        value:
          "Place general waste in the appropriate waste bin. Ensure the bin is regularly emptied and cleaned to prevent it from becoming a breeding ground for pests.",
      },
    ],
  },
  {
    id: 5,
    name: "E-waste",
    color: "#67CF84",
    icon: icons.ewaste,
    steps: [
      {
        key: 1,
        value:
          "Collect old electronic devices, batteries, and accessories. Group items by type and size to make transportation to a recycling center easier. Consider setting a specific spot in your home for e-waste collection.",
      },
      {
        key: 2,
        value:
          "Remove any personal data from electronic devices before recycling. Perform a factory reset on phones, tablets, and computers, and remove any storage media like SD cards or USB drives to ensure your personal information is secure.",
      },
      {
        key: 3,
        value:
          "Drop off e-waste at designated e-waste recycling bins or collection points. Many electronics stores and community centers have e-waste recycling programs. Check your local regulations for specific e-waste disposal guidelines.",
      },
    ],
  },
];

export const achievements = [
  {
    level: 1,
    name: "Basic",
    desciption: "Recycled your first 500g of recyclables",
    image: icons.lvl1plant,
  },
  {
    level: 2,
    name: "Beginner",
    desciption: "Saved 5.0kWh of energy",
    image: icons.lvl2plant,
  },
  {
    level: 3,
    name: "Novice",
    desciption: "Recycled 5kg of recyclables",
    image: icons.lvl3plant,
  },
  {
    level: 4,
    name: "Intermediate",
    desciption: "Saved 500g of CO2",
    image: icons.lvl4plant,
  },
  {
    level: 5,
    name: "Proficient",
    desciption: "Recycled 15kg of recyclables",
    image: icons.lvl5plant,
  },
];

export const awards = [
  {
    id: 1,
    name: "Badge 1",
    icon: icons.badge1,
    description: "1st Recyclables",
  },
  {
    id: 2,
    name: "Badge 2",
    icon: icons.badge2,
    description: "10th Recyclables",
  },
  {
    id: 3,
    name: "Badge 3",
    icon: icons.badge3,
    description: "100th Recyclables",
  },
  { id: 4, name: "Badge 4", icon: icons.badge4, description: "Welcome" },
  {
    id: 5,
    name: "Badge 5",
    icon: icons.badge5,
    description: "Paper Chase",
  },
  {
    id: 6,
    name: "Badge 6",
    icon: icons.badge6,
    description: "E-waste Warriors",
  },
  {
    id: 7,
    name: "Badge 7",
    icon: icons.badge7,
    description: "Fashion Forward",
  },
  {
    id: 8,
    name: "Badge 8",
    icon: icons.badge8,
    description: "Metal Mania",
  },
  {
    id: 9,
    name: "Badge 9",
    icon: icons.badge9,
    description: "Bottle Blitz",
  },
];

export const redemptions = [
  {
    id: 1,
    name: "HPB Credits",
    points: 1,
    icon: icons.hpbcredit,
  },
  {
    id: 2,
    name: "SimplyGo",
    points: 250,
    icon: icons.simplygo,
  },
  {
    id: 3,
    name: "$5 Fairprice eVoucher",
    points: 1050,
    icon: icons.fairprice,
  },
  {
    id: 4,
    name: "$5 HPB Voucher",
    points: 1050,
    icon: icons.hpb,
  },
  {
    id: 5,
    name: "$5 LiHO Voucher",
    points: 1050,
    icon: icons.liho,
  },
  {
    id: 6,
    name: "$5 Mr Bean Voucher",
    points: 1050,
    icon: icons.mrbean,
  },
];
