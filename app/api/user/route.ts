import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { gql } from "@apollo/client";
import client from "@/lib/apolloClient";
import { requireAuth } from "@/lib/middleware/requireRole";

//Define schema for validation
const userSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["Admin", "Manager", "HR", "Intern"]),
  name: z.string().min(2).max(20),
});

const GET_INTERN_INFO = gql`
  query GetInternInfo($id: Int!) {
    User(where: { id: { _eq: $id } }) {
    id
    name
    role
    email
    Infos {
      address
      college
      course
      createdAt
      degree
      departmentId
      fullName
      phone
      Department {
        name
        managerId
        manager {
          name
          email
        }
      }
    }
  }
  }
`;

export async function GET(req: Request) {
  const session = await requireAuth(req, ["Admin", "Manager", "HR", "Intern"]);
  let data;

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    data = await client.query({
      query: GET_INTERN_INFO,
      variables: { id: session.user.id },
    });
  } catch (error) {
    console.log("InternDash: Error fetching data", error);
    return NextResponse.json(
      { message: "Error fetching data", error },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "User fetched successfully", data },
    { status: 200 },
  );
}

export async function POST(req: Request) {
  // middleware to chek the user permission
  const session = await requireAuth(req, ["Admin", "Manager", "HR"]);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { email, password, name, role } = await req.json();
  // validating request data

  const validation = userSchema.safeParse({ email, password, name, role });

  if (!validation.success) {
    return NextResponse.json(
      { message: "Invalid data", errors: validation.error.issues },
      { status: 400 },
    );
  }

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  if (!password) {
    return NextResponse.json(
      { message: "Password is required" },
      { status: 400 },
    );
  }

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
    },
  });
  return NextResponse.json(
    { message: "User created successfully", data: user },
    { status: 201 },
  );
}
