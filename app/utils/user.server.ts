import bcrypt from 'bcryptjs'
import type { RegisterForm } from './types.server'
import { prisma } from './prisma.server'

export const createUser = async (user: RegisterForm) => {
  const passwordHash = await bcrypt.hash(user.password, 10)
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      username: user.username,
    },
  })
  return { id: newUser.id, email: user.email }
}

export const getOtherUsers = async (userId: number) => {
  return prisma.user.findMany({
    where: {
      id: { not: userId },
    },
    orderBy: {
      username: 'asc'
    },
  })
}

export async function checkFriendshipExistance(userId: number, friendId: number) {
  const friendship = await prisma.friendship.findMany({
    where: {
      OR: [
        { user1Id: userId, user2Id: friendId },
        { user2Id: userId, user1Id: friendId }
      ],
    }
  })

  const alreadyFriend = friendship.length > 0

  return (alreadyFriend)
}

export async function sendFriendshipInvite(userId: number, friendId: number) {

  return prisma.friendship.create({
    data: {
      user1Id: userId,
      user2Id: friendId,
      status: 'PENDING'
    }
  })
}

export async function acceptFriendshipInvite(friendshipId: number) {

  return prisma.friendship.update({
    where: {
      id: friendshipId
    },
    data: {
      status: 'ACCEPTED'
    }
  })
}

export async function blockFriendship(friendshipId: number) {

  return prisma.friendship.update({
    where: {
      id: friendshipId
    },
    data: {
      status: 'BLOCKED'
    }
  })
}