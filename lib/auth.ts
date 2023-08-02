import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcrypt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prismadb from '@/lib/prismadb';

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: 'Email', 
                    type: 'email'
                },
                password: {
                    label: 'Password', 
                    type: 'password'
                },
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required')
                }
                
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                
                if (!user || !user.hashedPassword) {
                    throw new Error('Email does not exist');
                }

                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
                
                if (!isCorrectPassword) {
                    throw new Error('Incorrect Password!')
                }

                return user;
            }
        })
    ],
    pages: {
        signIn:'/auth'
    },
    session: {
        strategy: "jwt"
    },
    adapter: PrismaAdapter(prismadb),
    debug: process.env.NODE_ENV === 'development',
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET
}