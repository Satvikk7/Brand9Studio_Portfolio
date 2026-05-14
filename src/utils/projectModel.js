function toLabel(value = '') {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getPathSegments(assetPath = '') {
  return String(assetPath).split('/').filter(Boolean)
}

export function getCategoryFromPath(assetPath = '') {
  const segments = getPathSegments(assetPath)
  const raw = segments[1] || 'General'
  return toLabel(raw).toUpperCase()
}

export function getProjectFolderFromPath(assetPath = '') {
  const segments = getPathSegments(assetPath)
  return toLabel(segments[2] || '')
}

export function normalizeProjects(rawProjects = []) {
  return rawProjects.map((project) => {
    const categoryFromPath = getCategoryFromPath(project.heroImage || project.images?.[0] || '')
    const projectFolder = project.projectFolder || getProjectFolderFromPath(project.heroImage || project.images?.[0] || '')

    return {
      ...project,
      category: project.category || categoryFromPath,
      projectFolder
    }
  })
}

export function buildCategories(projects = []) {
  const categorySet = new Set(projects.map((project) => project.category).filter(Boolean))
  const desiredOrder = [
    'BROCHURE',
    'CORPORATE DESKS',
    'WEBSITE PAGE',
    'SOCIAL MEDIA POSTS',
    'VISITING CARDS',
    'LOGO DESIGNS',
    'EMAILERS',
    'ANALYTICS'
  ]

  const sortedCategories = desiredOrder.filter((category) => categorySet.has(category))
  const remainingCategories = Array.from(categorySet).filter((category) => !desiredOrder.includes(category)).sort()

  return ['ALL', ...sortedCategories, ...remainingCategories]
}
