export type CourseId = '335' | '328'

export interface CourseMeta {
  id: CourseId
  code: string
  name: string
  shortName: string
  basePath: string
  accent: string
}

export const courses: Record<CourseId, CourseMeta> = {
  '335': {
    id: '335',
    code: 'MTHE 335',
    name: 'Mathematics of Engineering Systems',
    shortName: 'Engineering Systems',
    basePath: '',
    accent: 'indigo',
  },
  '328': {
    id: '328',
    code: 'MTHE 328',
    name: 'Real Analysis',
    shortName: 'Real Analysis',
    basePath: '/328',
    accent: 'cyan',
  },
}

export function getCourseFromPath(pathname: string): CourseId {
  if (pathname.startsWith('/328')) return '328'
  return '335'
}

export function buildChapterUrl(course: CourseId, slug: string): string {
  if (course === '328') return `/328/chapters/${slug}`
  return `/chapters/${slug}`
}

export function buildHomeworkUrl(course: CourseId, id: string): string {
  if (course === '328') return `/328/homework/${id}`
  return `/homework/${id}`
}

export function buildExamUrl(course: CourseId, id: string): string {
  if (course === '328') return `/328/exams/${id}`
  return `/exams/${id}`
}

export function buildCourseHomeUrl(course: CourseId): string {
  if (course === '328') return '/328'
  return '/'
}
