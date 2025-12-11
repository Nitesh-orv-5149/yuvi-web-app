import { pgTable, varchar, text, boolean, timestamp, integer, unique } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";  

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
  category_id: varchar("category_id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  desc: text("desc")
});

// EXPERTS
export const experts = pgTable("experts", {
  expertId: varchar("expert_id", { length: 50 }).primaryKey(),
  username: text("expert_username").notNull().unique(),
  email: text("expert_email").notNull().unique(),
  password: text("expert_password").notNull(),
  phoneNumber: varchar("phone_number", { length: 12 }).notNull(),

  categoryId: varchar("category_id")
    .notNull()
    .references(() => categories.category_id,{ onDelete: "cascade" }),//categoryId=>category_id and cascade added 

  bio: text("bio"),
  isApproved: boolean("is_approved").default(false).notNull(),
  queriesAnswered: integer("queries_answered").default(0).notNull(),
});

// queries (QUESTIONS)
export const queries = pgTable("queries", {
  queryId: varchar("query_id", { length: 50 }).primaryKey(),
  questionTitle: text("question_title").notNull(),
  questionBody: text("question_body").notNull(),
  clientId: varchar("client_id", { length: 50 })
    .notNull()
    .references(() => clients.clientId),
  categoryId: varchar("category_id")
    .notNull()
    .references(() => categories.category_id,{ onDelete: "cascade" }),//categoryId=>category_id and cascade added 
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ANSWERS (MULTIPLE PER query)
export const answers = pgTable("answers", {
  answerId: varchar("answer_id", { length: 50 }).primaryKey(),
  queryId: varchar("query_id", { length: 50 })
    .notNull()
    .references(() => queries.queryId),
  expertId: varchar("expert_id", { length: 50 })
    .notNull()
    .references(() => experts.expertId),
  answerBody: text("answer_body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// CONVERSATIONS 
export const conversations = pgTable("conversations", {
    conversationId: varchar("conversation_id", { length: 50 }).primaryKey(),
    clientId: varchar("client_id", { length: 50 })
      .notNull()
      .references(() => clients.clientId),
    expertId: varchar("expert_id", { length: 50 })
      .notNull()
      .references(() => experts.expertId),
    lastMessageId: varchar("last_message_id", { length: 50 })
      .references(() => messages.messageId),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    uniquePair: unique().on(table.clientId, table.expertId),
  })
);

// MESSAGES
export const messages = pgTable("messages", {
  messageId: varchar("message_id", { length: 50 }).primaryKey(),
  conversationId: varchar("conversation_id", { length: 50 })
    .notNull()
    .references(() => conversations.conversationId),
  senderRole: text("sender_role").notNull(), 
  senderId: varchar("sender_id", { length: 50 }).notNull(),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  deleted: boolean("deleted").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

//ADMIN
export const admin = pgTable("admin", {
  adminId: varchar("admin_id", { length: 50 }).primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});


