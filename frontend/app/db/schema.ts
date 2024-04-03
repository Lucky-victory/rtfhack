import { generateCommunityId, generateId, generateUsername } from "@/utils";
import { relations } from "drizzle-orm";
import {
  index,
  int,
  longtext,
  mediumtext,
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
  uniqueIndex,
  primaryKey,
  varchar,
  boolean,
  text,
} from "drizzle-orm/mysql-core";

export const articles = mysqlTable(
  "Articles",
  {
    id: int("id").autoincrement().primaryKey(),
    title: varchar("title", { length: 120 }).notNull(),
    intro: varchar("intro", { length: 255 }),
    image: mediumtext("image"),
    slug: varchar("slug", { length: 255 }).notNull(),
    content: longtext("content"),
    status: mysqlEnum("status", ["published", "draft", "deleted"]).default(
      "draft"
    ),
    views: int("views").default(0),
    userId: varchar("user_id", { length: 255 }),

    authorAddress: varchar("author_address_idx", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => ({
    titleIdx: index("title_idx").on(t.title),
    slugIdx: index("slug_idx").on(t.slug),
    userIdx: index("user_idx").on(t.userId),

    authorAddressIdx: index("author_address_idx").on(t.authorAddress),
  })
);
export const mealPlans = mysqlTable(
  "MealPlans",
  {
    id: int("id").autoincrement().primaryKey(),
    title: varchar("title", { length: 120 }).notNull(),
    intro: varchar("intro", { length: 255 }),
    image: mediumtext("image"),
    slug: varchar("slug", { length: 255 }).notNull(),
    content: longtext("content"),
    status: mysqlEnum("status", ["published", "draft", "deleted"]).default(
      "draft"
    ),
    views: int("views").default(0),
    time: varchar("time", {
      enum: ["breakfast", "lunch", "dinner", "snack"],
      length: 50,
    }).notNull(),

    userId: varchar("user_id", { length: 255 }),

    authorAddress: varchar("author_address", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
    titleIdx: index("title_idx").on(t.title),
    slugIdx: index("slug_idx").on(t.slug),

    authorAddressIdx: index("author_address_idx").on(t.authorAddress),
  })
);
export const fitnessPlans = mysqlTable(
  "FitnessPlans",
  {
    id: int("id").autoincrement().primaryKey(),
    title: varchar("title", { length: 120 }).notNull(),
    views: int("views").default(0),
    image: mediumtext("image"),
    slug: varchar("slug", { length: 255 }).notNull(),
    content: longtext("content"),
    status: mysqlEnum("status", ["published", "draft", "deleted"]).default(
      "draft"
    ),
    userId: varchar("user_id", { length: 255 }),

    authorAddress: varchar("author_address", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => ({
    titleIdx: index("title_idx").on(t.title),
    slugIdx: index("slug_idx").on(t.slug),
    authorAddressIdx: index("author_address_idx").on(t.authorAddress),
  })
);
export const users = mysqlTable(
  "Users",
  {
    id: int("id").autoincrement().primaryKey(),
    chainId: varchar("chain_id", { length: 100 }),
    //use this as a user id from a third party auth provider
    authId: varchar("auth_id", { length: 255 }).$defaultFn(() =>
      generateId("", 24)
    ),
    emailVerified: boolean("email_verified").default(false),
    fullName: varchar("full_name", { length: 120 }),
    username: varchar("username", { length: 50 })
      .unique()
      .notNull()
      .$defaultFn(generateUsername),
    password: varchar("password", { length: 255 }),
    email: varchar("email", { length: 255 }).unique(),
    address: varchar("address", { length: 100 }).notNull(),
    avatar: varchar("avatar", { length: 255 }),
    userType: mysqlEnum("user_type", ["member", "nutritionist"])
      .default("member")
      .notNull(),
    role: mysqlEnum("role", ["admin", "user"]).default("user"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.address, t.authId] }),
    emailIdx: index("email_idx").on(t.email),
    userTypeIdx: index("user_type_idx").on(t.userType),
    addressIdx: uniqueIndex("address_idx").on(t.address),

    usernameIdx: uniqueIndex("username_idx").on(t.username),
  })
);

export const meetingRecords = mysqlTable(
  "MeetingRecords",
  {
    id: int("id").autoincrement().primaryKey(),
    meetingId: varchar("meeting_id", { length: 100 }),
    roomId: varchar("room_id", { length: 255 }),
    userId: varchar("user_id", { length: 255 }),

    recordDuration: int("record_duration"),
    recordUri: varchar("record_uri", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => ({
    roomIdx: index("room_idx").on(t.roomId),
    userIdx: index("user_idx").on(t.userId),
  })
);
export const meetings = mysqlTable(
  "Meetings",
  {
    id: int("id").autoincrement().primaryKey(),
    title: varchar("title", { length: 255 }),
    roomId: varchar("room_id", { length: 100 }).notNull(),
    userId: varchar("user_id", { length: 255 }),

    participants: int("participants"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
    roomIdx: index("room_idx").on(t.roomId),
  })
);
export const communities = mysqlTable("Communities", {
  id: int("id").autoincrement().primaryKey(),
  spaceId: varchar("space_id", { length: 150 }).$defaultFn(generateCommunityId),
  status: mysqlEnum("status", ["published", "draft", "deleted"]).default(
    "published"
  ),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  visibility: mysqlEnum("visibility", ["public", "private"]).default("public"),
  slug: varchar("slug", { length: 255 }).notNull(),
  displayImage: varchar("display_image", { length: 255 }),
  coverImage: varchar("cover_image", { length: 255 }),
  userId: varchar("user_id", { length: 255 }),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export const communityMessages = mysqlTable("CommunityMessages", {
  id: int("id").autoincrement().primaryKey(),

  communityId: int("community_id"),
  userId: int("user_id"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});
export const messageAttachment = mysqlTable("MessageAttachments", {
  id: int("id").autoincrement().primaryKey(),
  messageId: int("message_id"),
  content: varchar("content", { length: 255 }),
});
export const communityEvents = mysqlTable("CommunityEvents", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  details: mediumtext("details"),
  communityId: int("community_id"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  venue: varchar("venue", {
    enum: ["online", "in-person"],
    length: 255,
  }).default("online"),
  location: varchar("location", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});
export const communityChallenges = mysqlTable("CommunityChallenges", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  details: mediumtext("details"),
  communityId: int("community_id"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  venue: varchar("venue", {
    enum: ["online", "in-person"],
    length: 255,
  }).default("online"),
  location: varchar("location", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});
export const communityMembers = mysqlTable("communityMembers", {
  id: int("id").autoincrement().primaryKey(),
  communityId: int("community_id"),
  userId: int("user_id"),
  role: mysqlEnum("role", ["moderator", "admin", "member"]),
  xp: int("xp").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

// relations
export const communityRelations = relations(communities, ({ one, many }) => ({
  events: many(communityEvents),
  challenges: many(communityChallenges),
  messages: many(communityMessages),
  members: many(communityMembers),
  author: one(users, {
    fields: [communities.userId],
    references: [users.authId],
  }),
}));
export const communityMembersRelations = relations(
  communityMembers,
  ({ one, many }) => ({
    user: one(users, {
      fields: [communityMembers.userId],
      references: [users.authId],
    }),

    community: one(communities, {
      fields: [communityMembers.communityId],
      references: [communities.id],
    }),
  })
);

export const communityMessagesRelations = relations(
  communityMessages,
  ({ one, many }) => ({
    author: one(users, {
      fields: [communityMessages.userId],
      references: [users.authId],
    }),
    attachments: many(messageAttachment),
  })
);
export const meetingRelations = relations(meetings, ({ one, many }) => ({
  records: many(meetingRecords),
  author: one(users, {
    fields: [meetings.userId],
    references: [users.authId],
  }),
  // // this and the above references a user, this for a local auth, while the other is for a third party auth
  // author: one(users, {
  //   fields: [meetings.userId],
  //   references: [users.authId],
  // }),
}));
export const meetingRecordsRelations = relations(
  meetingRecords,
  ({ one, many }) => ({
    records: many(meetingRecords),
    author: one(users, {
      fields: [meetingRecords.userId],
      references: [users.authId],
    }),
    // // this and the above references a user, this for a local auth, while the other is for a third party auth
    // author: one(users, {
    //   fields: [meetingRecords.userId],
    //   references: [users.id],
    // }),
  })
);
export const userRelations = relations(users, ({ one, many }) => ({
  fitnessPlans: many(fitnessPlans),
  mealPlans: many(mealPlans),
  articles: many(articles),
  meeting: many(meetings),
  communities: many(communities),
}));

export const articlesRelations = relations(articles, ({ one, many }) => ({
  author: one(users, {
    fields: [articles.userId],
    references: [users.authId],
  }),
}));
export const mealPlansRelations = relations(mealPlans, ({ one, many }) => ({
  author: one(users, {
    fields: [mealPlans.userId],
    references: [users.authId],
  }),
}));
export const fitnessPlansRelations = relations(
  fitnessPlans,
  ({ one, many }) => ({
    author: one(users, {
      fields: [fitnessPlans.userId],
      references: [users.authId],
    }),
  })
);
