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
} from "drizzle-orm/mysql-core";

export const articles = mysqlTable(
  "Articles",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 120 }).notNull(),
    intro: varchar("intro", { length: 255 }),
    image: mediumtext("image"),
    slug: varchar("slug", { length: 255 }).notNull(),
    content: longtext("content"),
    status: mysqlEnum("status", ["published", "draft", "deleted"]).default(
      "draft"
    ),
    views: int("views").default(0),
    userId: int("user_id"),
    authId: varchar("auth_id", { length: 255 }),

    authorAddress: varchar("author_address_idx", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => ({
    titleIdx: index("title_idx").on(t.title),
    slugIdx: index("slug_idx").on(t.slug),
    userIdx: index("user_idx").on(t.userId),
    authIdx: index("auth_idx").on(t.authId),
    authorAddressIdx: index("author_address_idx").on(t.authorAddress),
  })
);
export const mealPlans = mysqlTable(
  "MealPlans",
  {
    id: serial("id").primaryKey(),
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
    userId: int("user_id"),
    authId: varchar("auth_id", { length: 255 }),

    authorAddress: varchar("author_address", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
    titleIdx: index("title_idx").on(t.title),
    slugIdx: index("slug_idx").on(t.slug),
    authIdx: index("auth_idx").on(t.authId),
    authorAddressIdx: index("author_address_idx").on(t.authorAddress),
  })
);
export const fitnessPlans = mysqlTable(
  "FitnessPlans",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 120 }).notNull(),
    views: int("views").default(0),
    image: mediumtext("image"),
    slug: varchar("slug", { length: 255 }).notNull(),
    content: longtext("content"),
    status: mysqlEnum("status", ["published", "draft", "deleted"]).default(
      "draft"
    ),
    authId: varchar("auth_id", { length: 255 }),
    userId: int("user_id"),
    authorAddress: varchar("author_address", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => ({
    authIdx: index("auth_idx").on(t.authId),
    titleIdx: index("title_idx").on(t.title),
    slugIdx: index("slug_idx").on(t.slug),
    authorAddressIdx: index("author_address_idx").on(t.authorAddress),
  })
);
export const users = mysqlTable(
  "Users",
  {
    id: serial("id").primaryKey(),
    chainId: varchar("chain_id", { length: 100 }),
    //use this as a user id from a third party auth provider
    authId: varchar("auth_id", { length: 255 }).unique(),
    emailVerified: boolean("email_verified").default(false),
    fullName: varchar("full_name", { length: 120 }),
    username: varchar("username", { length: 50 }).unique().notNull(),
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
    authIdx: uniqueIndex("auth_idx").on(t.authId),
    usernameIdx: uniqueIndex("username_idx").on(t.username),
  })
);
export const userRelations = relations(users, ({ one, many }) => ({
  fitnessPlans: many(fitnessPlans),
  mealPlans: many(mealPlans),
  articles: many(articles),
  meeting: many(meetings),
}));

export const articlesRelations = relations(articles, ({ one, many }) => ({
  author: one(users, {
    fields: [articles.authorAddress],
    references: [users.address],
  }),
}));
export const mealPlansRelations = relations(mealPlans, ({ one, many }) => ({
  author: one(users, {
    fields: [mealPlans.authorAddress],
    references: [users.address],
  }),
}));
export const fitnessPlansRelations = relations(
  fitnessPlans,
  ({ one, many }) => ({
    author: one(users, {
      fields: [fitnessPlans.authorAddress],
      references: [users.address],
    }),
  })
);

export const meetingRecords = mysqlTable(
  "MeetingRecords",
  {
    id: int("id").autoincrement().primaryKey(),
    meetingId: varchar("meeting_id", { length: 100 }),
    roomId: varchar("room_id", { length: 255 }),
    authId: varchar("auth_id", { length: 255 }),
    userId: int("user_id"),
    recordDuration: int("record_duration"),
    recordUri: varchar("record_uri", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => ({
    authIdx: index("auth_idx").on(t.authId),
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
    authId: varchar("auth_id", { length: 255 }),
    userId: int("user_id"),
    participants: int("participants"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => ({
    authIdx: index("auth_idx").on(t.authId),
    userIdx: index("user_idx").on(t.userId),
    roomIdx: index("room_idx").on(t.roomId),
  })
);

export const meetingRelations = relations(meetings, ({ one, many }) => ({
  records: many(meetingRecords),
  creator: one(users, {
    fields: [meetings.authId],
    references: [users.authId],
  }),
  // this and the above references a user, this for a local auth, while the other is for a third party auth
  author: one(users, {
    fields: [meetings.userId],
    references: [users.id],
  }),
}));
export const meetingRecordsRelations = relations(
  meetingRecords,
  ({ one, many }) => ({
    records: many(meetingRecords),
    creator: one(users, {
      fields: [meetingRecords.authId],
      references: [users.authId],
    }),
    // this and the above references a user, this for a local auth, while the other is for a third party auth
    author: one(users, {
      fields: [meetingRecords.userId],
      references: [users.id],
    }),
  })
);
