import { pgTable, varchar, text, boolean, timestamp, integer } from "drizzle-orm/pg-core";

// CLIENTS
export const clients = pgTable("clients", {
  clientId: varchar("client_id", { length: 50 }).primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  phoneNumber: varchar("phone_number", { length: 12 }).notNull()
});

// CATEGORIES
export const categories = pgTable("categories", {
  categoryId: varchar("category_id", { length: 50 }).primaryKey(),
  name: text("name").notNull().unique(),
});

// EXPERTS
export const experts = pgTable("experts", {
  expertId: varchar("expert_id", { length: 50 }).primaryKey(),
  expertUsername: text("expert_username").notNull().unique(),
  expertEmail: text("expert_email").notNull().unique(),
  expertPassword: text("expert_password").notNull(),
  expertPhoneNumber: varchar("phone_number", { length: 12 }).notNull(),

  categoryId: varchar("category_id")
    .notNull()
    .references(() => categories.categoryId),

  bio: text("bio"),
  isApproved: boolean("is_approved").default(false).notNull(),
  postsAnswered: integer("posts_answered").default(0).notNull(),
});

// POSTS (QUESTIONS)
export const posts = pgTable("posts", {
  postId: varchar("post_id", { length: 50 }).primaryKey(),

  questionTitle: text("question_title").notNull(),
  questionBody: text("question_body").notNull(),

  clientId: varchar("client_id", { length: 50 })
    .notNull()
    .references(() => clients.clientId),

  categoryId: text("category_id")
    .notNull()
    .references(() => categories.name),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ANSWERS (MULTIPLE PER POST)
export const answers = pgTable("answers", {
  answerId: varchar("answer_id", { length: 50 }).primaryKey(),

  postId: varchar("post_id", { length: 50 })
    .notNull()
    .references(() => posts.postId),

  expertId: varchar("expert_id", { length: 50 })
    .notNull()
    .references(() => experts.expertId),

  answerBody: text("answer_body").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// MESSAGES
export const messages = pgTable("messages", {
  messageId: varchar("message_id", { length: 50 }).primaryKey(),

  clientId: varchar("client_id", { length: 50 })
    .notNull()
    .references(() => clients.clientId),

  expertId: varchar("expert_id", { length: 50 })
    .notNull()
    .references(() => experts.expertId),

  content: text("content").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
