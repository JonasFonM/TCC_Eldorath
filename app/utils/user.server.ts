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

export const searchUsers = async (query: string) => {
  return prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: query } },
        { email: { contains: query } },
      ],
    },
    take: 10,
  });
};

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
export async function checkFriendshipStatus(userId: number, friendId: number) {
  const friendship = await prisma.friendship.findMany({
    where: {
      OR: [
        { user1Id: userId, user2Id: friendId },
        { user2Id: userId, user1Id: friendId }
      ],
    }
  })
  const friendStatus = String(friendship.map(fr => fr.status))

  return (friendStatus)
}

export async function checkPendingFriendInvite(userId: number, friendId: number) {
  const friendship = await prisma.friendship.findMany({
    where: {
      user1Id: friendId,
      user2Id: userId,
      status: 'PENDING'
    }
  })

  const isPending = friendship.length > 0

  return (isPending)
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

export async function acceptFriendshipInvite(userId: number, friendId: number) {

  return prisma.friendship.updateMany({
    where: {
      user1Id: friendId,
      user2Id: userId
    },
    data: {
      status: 'ACCEPTED'
    }
  })

}
export async function unmakeFriendship(userId: number, friendId: number) {

  return prisma.friendship.deleteMany({
    where: {
      user1Id: friendId,
      user2Id: userId
    }
  })
}

export async function blockFriendship(userId: number, friendId: number) {

  return prisma.friendship.updateMany({
    where: {
      OR: [{
        user1Id: friendId,
        user2Id: userId
      },
      {
        user1Id: userId,
        user2Id: friendId
      }
      ]
    },
    data: {
      status: 'BLOCKED'
    }
  })
}