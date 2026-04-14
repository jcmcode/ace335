export interface Chapter328 {
  number: number
  slug: string
  title: string
  shortTitle: string
  description: string
  topics: string[]
  group: 'foundations' | 'structure' | 'convergence' | 'calculus' | 'integration'
}

export const chapters328: Chapter328[] = [
  {
    number: 1,
    slug: 'topological-spaces',
    title: 'Topological Spaces',
    shortTitle: 'Topological Spaces',
    description:
      'The foundational structure of analysis: open sets, closed sets, and the topology axioms. Includes the discrete, trivial, and Euclidean topologies.',
    topics: ['Power Set', 'Topology Axioms', 'Open Sets', 'Closed Sets', 'Clopen Sets', 'Trivial Topology', 'Discrete Topology', 'Euclidean Topology'],
    group: 'foundations',
  },
  {
    number: 2,
    slug: 'metric-spaces',
    title: 'Metric Spaces',
    shortTitle: 'Metric Spaces',
    description:
      'Spaces equipped with a notion of distance. The metric gives rise to a topology through open balls. Includes standard examples, norms, and the metric topology.',
    topics: ['Metric Axioms', 'Distance', 'Open Balls', 'Metric Topology', 'Norms', 'Discrete Metric', 'Product Metrics', 'Equivalence of Metrics'],
    group: 'foundations',
  },
  {
    number: 3,
    slug: 'interior-closure-boundary',
    title: 'Interior, Closure, and Boundary',
    shortTitle: 'Interior & Closure',
    description:
      'Operations that capture the "inside," "including the edge," and the "edge itself" of a set. The interior is the largest open subset; the closure is the smallest closed superset.',
    topics: ['Interior', 'Closure', 'Boundary', 'Dense Sets', 'Accumulation Points', 'Isolated Points', 'Limit Points'],
    group: 'structure',
  },
  {
    number: 4,
    slug: 'continuity',
    title: 'Continuity and Limits',
    shortTitle: 'Continuity',
    description:
      'The topological definition of continuity: preimages of open sets are open. Equivalent characterizations via sequences and epsilon-delta on metric spaces.',
    topics: ['Continuity', 'Sequential Continuity', 'Epsilon-Delta', 'Uniform Continuity', 'Homeomorphisms', 'Limits of Functions', 'Lipschitz Functions'],
    group: 'structure',
  },
  {
    number: 5,
    slug: 'sequences-convergence',
    title: 'Sequences and Convergence',
    shortTitle: 'Sequences',
    description:
      'Convergence of sequences in topological and metric spaces. Subsequences, accumulation points, and the connection between sequences and closed sets.',
    topics: ['Convergence', 'Subsequences', 'Bolzano-Weierstrass', 'Accumulation Points', 'Sequential Closure', 'Limit Uniqueness'],
    group: 'convergence',
  },
  {
    number: 6,
    slug: 'completeness',
    title: 'Completeness and Cauchy Sequences',
    shortTitle: 'Completeness',
    description:
      'Cauchy sequences capture the intuitive notion of "eventually close" without requiring a limit. Complete spaces are those in which every Cauchy sequence converges.',
    topics: ['Cauchy Sequences', 'Complete Metric Spaces', 'Banach Fixed-Point Theorem', 'Completion', 'Baire Category Theorem'],
    group: 'convergence',
  },
  {
    number: 7,
    slug: 'compactness',
    title: 'Compactness',
    shortTitle: 'Compactness',
    description:
      'The generalization of "finite" for infinite sets. Every open cover has a finite subcover. In metric spaces: equivalent to sequential compactness and total boundedness. The Heine-Borel theorem.',
    topics: ['Open Covers', 'Compact Sets', 'Sequential Compactness', 'Heine-Borel Theorem', 'Total Boundedness', 'Continuous Image of Compact', 'Extreme Value Theorem'],
    group: 'structure',
  },
  {
    number: 8,
    slug: 'connectedness',
    title: 'Connectedness',
    shortTitle: 'Connectedness',
    description:
      'Topological notion of being "in one piece." Connected sets cannot be split into two disjoint nonempty open subsets. Path-connectedness is a stronger, more intuitive form.',
    topics: ['Connected Sets', 'Path Connectedness', 'Connected Components', 'Intermediate Value Theorem', 'Continuous Image of Connected'],
    group: 'structure',
  },
  {
    number: 9,
    slug: 'partial-derivatives',
    title: 'Multivariable Differentiation',
    shortTitle: 'Partial Derivatives',
    description:
      'Partial derivatives, the gradient, and the total derivative for functions of several variables. Clairaut\'s theorem on equality of mixed partials. Classes of differentiable functions (C^k).',
    topics: ['Partial Derivatives', 'Total Derivative', 'Jacobian Matrix', 'Gradient', 'Chain Rule', 'Mixed Partials', 'Clairaut Theorem', 'C^k Functions'],
    group: 'calculus',
  },
  {
    number: 10,
    slug: 'implicit-function',
    title: 'The Implicit Function Theorem',
    shortTitle: 'Implicit Function',
    description:
      'When can an implicit equation F(x, y) = 0 be solved locally for y as a function of x? The implicit function theorem gives sufficient conditions via the non-singular Jacobian. Inverse function theorem as a special case.',
    topics: ['Implicit Function Theorem', 'Inverse Function Theorem', 'Non-Singular Jacobian', 'Local Solvability'],
    group: 'calculus',
  },
  {
    number: 11,
    slug: 'multivariable-differentiation',
    title: 'Taylor Expansion and Extrema',
    shortTitle: 'Taylor & Extrema',
    description:
      'Taylor expansions for functions of several variables, with integral and Lagrange remainders. Critical points, the Hessian matrix, and the second derivative test for classifying extrema.',
    topics: ['Multivariable Taylor', 'Remainder Bounds', 'Critical Points', 'Hessian Matrix', 'Second Derivative Test', 'Classification of Extrema'],
    group: 'calculus',
  },
  {
    number: 12,
    slug: 'lagrange-multipliers',
    title: 'Lagrange Multipliers',
    shortTitle: 'Lagrange Multipliers',
    description:
      'Optimizing a function subject to equality constraints. The method of Lagrange multipliers, derived via the implicit function theorem. Extends to multiple constraints with a full-rank Jacobian condition.',
    topics: ['Constrained Optimization', 'Single Constraint', 'Multiple Constraints', 'Lagrangian', 'Full-Rank Jacobian'],
    group: 'calculus',
  },
  {
    number: 13,
    slug: 'integration-measure',
    title: 'Integration and Measure Theory',
    shortTitle: 'Integration & Measure',
    description:
      'Darboux sums and the Riemann integral. Jordan content and zero Lebesgue measure. Lebesgue\'s criterion for Riemann integrability. Introduction to sigma-algebras, Borel sets, outer measures, and Lebesgue measure.',
    topics: ['Darboux Sums', 'Riemann Integral', 'Jordan Content', 'Lebesgue Measure Zero', 'Lebesgue Criterion', 'Sigma-Algebras', 'Borel Sets', 'Outer Measures'],
    group: 'integration',
  },
]

export const groupLabels328: Record<Chapter328['group'], string> = {
  foundations: 'Foundations',
  structure: 'Structural Properties',
  convergence: 'Convergence & Completeness',
  calculus: 'Multivariable Calculus',
  integration: 'Integration & Measure',
}

export const groupDescriptions328: Record<Chapter328['group'], string> = {
  foundations: 'The underlying spaces — topology and metric — that everything else lives in',
  structure: 'Interior, closure, continuity, compactness, and connectedness',
  convergence: 'Sequences, Cauchy sequences, and completeness',
  calculus: 'Taylor expansion in several variables and constrained optimization',
  integration: 'Riemann and Lebesgue integration, measure theory',
}

export function getChapter328BySlug(slug: string): Chapter328 | undefined {
  return chapters328.find(c => c.slug === slug)
}

export function getAdjacent328Chapters(slug: string) {
  const idx = chapters328.findIndex(c => c.slug === slug)
  return {
    prev: idx > 0 ? chapters328[idx - 1] : null,
    next: idx < chapters328.length - 1 ? chapters328[idx + 1] : null,
  }
}
