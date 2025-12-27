"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideMenu, Search, Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import logo from "../public/logo.png";
import Image from "next/image";

export default function TaskEraLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-[#1E3A34] text-white sticky top-0 hidden md:flex flex-col">
          <div className="p-6 flex items-center gap-3 border-b border-white/6">
            {
                logo ? <Image src={logo} alt="Task-Era Logo" className="w-10 h-10 rounded-full object-cover" /> :
                <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center font-semibold">TE</div>
            }
            <div>
              <h1 className="text-lg font-semibold">Task-Era</h1>
              <p className="text-xs text-white/70">Project Management</p>
            </div>
          </div>

          <nav className="p-4 flex-1 space-y-1">
            <NavItem label="Dashboard" />
            <NavItem label="Orders" />
            <NavItem label="Tickets" />
            <NavItem label="Clients" />

            <div className="mt-6 pt-4 border-t border-white/6 text-xs text-white/70">Billing</div>
            <NavItem label="Invoices" />
            <NavItem label="Subscriptions" />

            <div className="mt-6 pt-4 border-t border-white/6 text-xs text-white/70">Setup</div>
            <NavItem label="Integrations" />
            <NavItem label="Settings" />
          </nav>

          <div className="p-4 border-t border-white/6">
            <Button className="w-full" variant="secondary">Create Team</Button>
          </div>
        </aside>

        {/* Main area */}
        <div className="flex-1">
          {/* Topbar */}
          <header className="flex items-center justify-between gap-4 bg-white px-4 py-3 border-b">
            <div className="flex items-center gap-3">
              <button className="md:hidden p-2 rounded-md bg-white/50">
                <LucideMenu className="w-5 h-5 text-slate-700" />
              </button>

              <div className="relative">
                <input
                  placeholder="Search..."
                  className="w-[560px] max-w-xs md:max-w-md lg:max-w-xl bg-slate-50 border rounded-md py-2 pl-10 pr-4 text-sm placeholder:text-slate-400"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-slate-600" />
              <Settings className="w-5 h-5 text-slate-600" />
              <Avatar className="w-8 h-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Content layout */}
          <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left / Main Column */}
            <section className="lg:col-span-2 space-y-4">
              <Card className="shadow-sm">
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">Initial Starter Plan</h2>
                      <p className="text-sm text-slate-500">Starter Plan • $500.00 • Created: Feb 1, 2020</p>

                      <Tabs defaultValue="tasks" className="mt-4">
                        <TabsList>
                          <TabsTrigger value="tasks">Tasks</TabsTrigger>
                          <TabsTrigger value="project">Project Data</TabsTrigger>
                          <TabsTrigger value="history">History</TabsTrigger>
                          <TabsTrigger value="comments">Comments</TabsTrigger>
                        </TabsList>

                        <TabsContent value="tasks">
                          <div className="mt-4 space-y-3">
                            <NewTaskRow />

                            <TaskCard title="Greetings!" description="Greet the client, and thank them for their purchase." dueDate="Sep 14, 2023" tagColor="purple" />
                            <TaskCard title="Get to Work" description="Start working on the order." />
                            <TaskCard title="QA Step" description="Submit deliverables to Account Manager for review." dueDate="Sep 14, 2023" tagColor="yellow" />
                            <TaskCard title="Send em Out!" description="Send deliverables to client!" tagColor="pink" />
                          </div>
                        </TabsContent>

                        <TabsContent value="project">
                          <div className="py-6 text-sm text-slate-600">Project data content — add fields and metadata here.</div>
                        </TabsContent>

                        <TabsContent value="history">
                          <div className="py-6 text-sm text-slate-600">History & activity logs.</div>
                        </TabsContent>

                        <TabsContent value="comments">
                          <div className="py-6 text-sm text-slate-600">Comments UI goes here.</div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div className="hidden md:block w-44 text-right text-sm text-slate-500">
                      <div className="mb-2">FF8CD6D8</div>
                      <div className="mb-2">Note</div>
                      <div className="text-sm text-slate-400">Add note for your team...</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional content or lists could go here */}
            </section>

            {/* Right column / Details panel */}
            <aside className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="text-sm font-medium">Note</h3>
                <textarea className="w-full mt-2 p-2 rounded border text-sm h-24 resize-none" placeholder="Add note for your team..."></textarea>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="text-sm font-semibold">Details</h4>
                <div className="mt-3 text-sm text-slate-600 space-y-2">
                  <Row label="Service" value="Starter Plan" />
                  <Row label="Client" value="Globex Industries" />
                  <Row label="Status" value={<StatusBadge label="Pending" variant="orange" />} />
                  <Row label="Assign To" value={<AssigneeList />} />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-4 rounded-md shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Invoice</h4>
                  <span className="text-sm text-green-600 font-semibold">Paid</span>
                </div>

                <div className="mt-3 text-sm text-slate-600">Amount</div>
                <div className="text-lg font-bold">$500.00</div>
              </motion.div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ----------------- Small helper components ----------------- */

function NavItem({ label }: { label: string }) {
  return (
    <div className="rounded-md px-3 py-2 hover:bg-white/6 cursor-pointer flex items-center gap-3">
      <div className="w-8 h-8 bg-white/6 rounded flex items-center justify-center text-sm">{label[0]}</div>
      <span className="text-sm">{label}</span>
    </div>
  );
}

function NewTaskRow() {
  return (
    <div className="flex items-center gap-3 p-3 rounded border border-dashed border-slate-200 bg-slate-50">
      <input type="checkbox" className="w-4 h-4" />
      <input placeholder="New Task" className="flex-1 bg-transparent outline-none text-sm" />
      <Button size="sm">Add</Button>
    </div>
  );
}

function TaskCard({ title, description, dueDate, tagColor }: { title: string; description?: string; dueDate?: string; tagColor?: string; }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-md bg-white border">
      <input type="checkbox" className="mt-1" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{title}</h4>
          {dueDate && <div className="text-xs text-slate-500">{dueDate}</div>}
        </div>
        <p className="text-sm text-slate-500">{description}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className={`inline-block text-xs px-2 py-1 rounded ${getTagColorClass(tagColor)}`}>L</span>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
}

function StatusBadge({ label, variant = "green" }: { label: string; variant?: "green" | "orange" | "red" }) {
  const base = "inline-block px-2 py-1 text-xs font-semibold rounded";
  const cls = variant === "green" ? "bg-green-100 text-green-800" : variant === "orange" ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800";
  return <span className={`${base} ${cls}`}>{label}</span>;
}

function AssigneeList() {
  return (
    <div className="flex items-center gap-2">
      <div className="text-xs px-2 py-1 rounded bg-slate-100">Jane Cooper</div>
      <div className="text-xs px-2 py-1 rounded bg-slate-100">Lipton Das</div>
    </div>
  );
}

function getTagColorClass(color?: string) {
  switch (color) {
    case "yellow":
      return "bg-yellow-100 text-yellow-800";
    case "pink":
      return "bg-pink-100 text-pink-800";
    case "purple":
      return "bg-violet-100 text-violet-800";
    default:
      return "bg-slate-100 text-slate-700";
  }
}
