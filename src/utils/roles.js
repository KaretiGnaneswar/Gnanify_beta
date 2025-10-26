// Role hierarchy utility functions

// Role hierarchy: user < contributor < admin
export const ROLE_HIERARCHY = {
  user: 1,
  contributor: 2,
  admin: 3
}

// Check if user has minimum role level
export const hasRole = (userRole, requiredRole) => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}

// Check if user can access user features
export const canAccessUser = (user) => {
  return !!user && hasRole(user.role, 'user')
}

// Check if user can access contributor features
export const canAccessContributor = (user) => {
  return !!user && (
    hasRole(user.role, 'contributor') ||
    (user.role === 'contributor' && user.is_approved_contributor)
  )
}

// Check if user can access admin features
export const canAccessAdmin = (user) => {
  return !!user && hasRole(user.role, 'admin')
}

// Get user's effective permissions
export const getUserPermissions = (user) => {
  if (!user) {
    return {
      canAccessUser: false,
      canAccessContributor: false,
      canAccessAdmin: false,
      roleLevel: 0
    }
  }

  return {
    canAccessUser: canAccessUser(user),
    canAccessContributor: canAccessContributor(user),
    canAccessAdmin: canAccessAdmin(user),
    roleLevel: ROLE_HIERARCHY[user.role]
  }
}

// Get role display name
export const getRoleDisplayName = (role) => {
  const roleNames = {
    user: 'User',
    contributor: 'Contributor',
    admin: 'Administrator'
  }
  return roleNames[role]
}

// Get role description
export const getRoleDescription = (role) => {
  const descriptions = {
    user: 'Basic access to courses, problems, and community features',
    contributor: 'Can create content, courses, and manage community (includes all user features)',
    admin: 'Full system access including user management and analytics (includes all features)'
  }
  return descriptions[role]
}
