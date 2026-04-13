export interface Chapter {
  number: number
  slug: string
  title: string
  shortTitle: string
  description: string
  topics: string[]
  group: 'foundations' | 'transforms' | 'control' | 'advanced' | 'appendix'
}

export const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'introduction',
    title: 'Introduction',
    shortTitle: 'Intro',
    description: 'Course overview, systems as maps, applications in control, signal processing, and communications. Linearization of nonlinear systems.',
    topics: ['Systems as Maps', 'Control Theory Applications', 'Signal Processing Applications', 'Communications & Information Theory', 'Linearization'],
    group: 'foundations',
  },
  {
    number: 2,
    slug: 'signal-spaces',
    title: 'Signal Spaces: Linear, Banach and Hilbert Spaces, and Basis Expansions',
    shortTitle: 'Signal Spaces',
    description: 'Normed linear spaces, metric spaces, Banach spaces, inner product spaces, Hilbert spaces. Orthogonality, separability, and signal expansions using Fourier, Haar, and polynomial bases.',
    topics: ['Normed Linear Spaces', 'Metric Spaces', 'Banach Spaces', 'Hilbert Spaces', 'Inner Products', 'Orthogonality', 'Separable Spaces', 'Fourier Basis', 'Haar Basis', 'Best Approximations'],
    group: 'foundations',
  },
  {
    number: 3,
    slug: 'dual-spaces',
    title: 'Dual Spaces, the Schwartz Space and Distribution Theory, and the Dirac Delta Function',
    shortTitle: 'Dual Spaces & Distributions',
    description: 'Dual spaces of normed linear spaces, weak and weak* convergence. Distribution theory, test functions, the Schwartz space, and the Dirac delta as a distribution.',
    topics: ['Dual Spaces', 'Riesz Representation', 'Weak Convergence', 'Weak* Convergence', 'Test Functions', 'Schwartz Space', 'Distributions', 'Dirac Delta', 'Approximate Identity Sequences', 'Convolution'],
    group: 'foundations',
  },
  {
    number: 4,
    slug: 'systems',
    title: 'Systems',
    shortTitle: 'Systems',
    description: 'System properties: linearity, time-invariance, causality. LTI (convolution) systems, BIBO stability, transfer functions, frequency response, Bode plots, feedback systems, and state-space descriptions.',
    topics: ['System Properties', 'Linearity', 'Time-Invariance', 'Causality', 'Convolution Systems', 'BIBO Stability', 'Transfer Functions', 'Frequency Response', 'Bode Plots', 'Feedback Systems', 'State-Space'],
    group: 'transforms',
  },
  {
    number: 5,
    slug: 'fourier',
    title: 'The Fourier Transformation',
    shortTitle: 'Fourier Transform',
    description: 'All four Fourier transforms: DDFT, CDFT, DCFT, and CCFT. Fourier series, DFT properties, FFT algorithm, Plancherel/Parseval theorems, transforms of distributions, and the sampling/bandwidth tradeoff.',
    topics: ['Fourier Series', 'DDFT', 'CDFT', 'DCFT', 'CCFT', 'FFT Algorithm', 'Inverse Transform', 'Plancherel Identity', 'Parseval Theorem', 'Fourier of Distributions', 'Periodic Signals', 'Band-Limited vs Time-Limited'],
    group: 'transforms',
  },
  {
    number: 6,
    slug: 'frequency-domain',
    title: 'Frequency Domain Analysis of Linear Time-Invariant (LTI) Systems',
    shortTitle: 'Frequency Domain',
    description: 'Input-output relations for LTI systems via Fourier analysis. Computing transfer functions for convolution systems using Fourier transforms.',
    topics: ['I/O Relations via Fourier', 'Transfer Function Computation', 'Convolution Systems Analysis', 'Frequency Domain Methods'],
    group: 'transforms',
  },
  {
    number: 7,
    slug: 'laplace-z',
    title: 'The Laplace and Z-Transformations',
    shortTitle: 'Laplace & Z-Transforms',
    description: 'Two-sided and one-sided Laplace and Z-transforms. Properties: linearity, convolution, shift, differentiation, scaling. Initial and final value theorems. Inverse transforms, systems analysis, causality, stability, and minimum-phase systems.',
    topics: ['Two-Sided Laplace', 'One-Sided Laplace', 'Two-Sided Z-Transform', 'One-Sided Z-Transform', 'Linearity', 'Convolution Property', 'Shift Property', 'Differentiation', 'Initial Value Theorem', 'Final Value Theorem', 'Inverse Transforms', 'Causality & Stability', 'Minimum-Phase Systems'],
    group: 'transforms',
  },
  {
    number: 8,
    slug: 'control-frequency',
    title: 'Control Analysis and Design through Frequency Domain Methods',
    shortTitle: 'Control & Frequency Domain',
    description: 'Transfer function shaping via feedback control: PID controllers, Bode plot analysis, root locus method, Nyquist stability criterion, system gain and passivity, predictive and feedforward control.',
    topics: ['Closed-Loop vs Open-Loop', 'PID Controllers', 'Bode Plot Analysis', 'Root Locus Method', 'Nyquist Stability Criterion', 'System Gain', 'Passivity', 'Small Gain Theorem', 'Predictive Control', 'Feedforward Control'],
    group: 'control',
  },
  {
    number: 9,
    slug: 'state-space',
    title: 'Realizability and State Space Representation',
    shortTitle: 'State Space',
    description: 'Realizations of transfer functions: controllable, observable, and modal canonical forms. Zero-state equivalence, algebraic equivalence, and discretization of continuous-time systems.',
    topics: ['Controllable Canonical Form', 'Observable Canonical Form', 'Modal Realization', 'Zero-State Equivalence', 'Algebraic Equivalence', 'Discretization'],
    group: 'control',
  },
  {
    number: 10,
    slug: 'sampling',
    title: 'The Sampling Theorem',
    shortTitle: 'Sampling Theorem',
    description: 'Sampling of continuous-time and discrete-time signals. The Nyquist-Shannon sampling theorem and reconstruction from samples.',
    topics: ['CT Signal Sampling', 'DT Signal Sampling', 'Nyquist-Shannon Theorem', 'Aliasing', 'Reconstruction'],
    group: 'control',
  },
  {
    number: 11,
    slug: 'stability',
    title: 'Stability and Lyapunov\'s Method',
    shortTitle: 'Stability & Lyapunov',
    description: 'Stability criteria for linear systems. Lyapunov\'s direct method for general nonlinear systems. Linearization for stability analysis. Discrete-time stability.',
    topics: ['Stability Criteria', 'Linear System Stability', 'Lyapunov Functions', 'Lyapunov Direct Method', 'Linearization', 'Nonlinear Systems', 'Discrete-Time Stability'],
    group: 'advanced',
  },
  {
    number: 12,
    slug: 'controllability',
    title: 'Controllability and Observability',
    shortTitle: 'Controllability & Observability',
    description: 'Controllability and observability of linear systems. Feedback and pole placement, observer design, canonical forms, and Riccati equations for stabilizing controllers.',
    topics: ['Controllability', 'Observability', 'Controllability Matrix', 'Observability Matrix', 'Pole Placement', 'Observer Design', 'Observer Feedback', 'Canonical Forms', 'Riccati Equations'],
    group: 'advanced',
  },
  {
    number: 13,
    slug: 'appendix-integration',
    title: 'Appendix A: Integration and Some Useful Properties',
    shortTitle: 'Appendix A: Integration',
    description: 'Measurable spaces, Borel sigma-fields, Lebesgue integration, Fatou\'s lemma, monotone and dominated convergence theorems, differentiation under the integral, and Fubini\'s theorem.',
    topics: ['Measurable Space', 'Borel Sigma-Field', 'Lebesgue Integration', 'Fatou Lemma', 'Dominated Convergence', 'Fubini Theorem'],
    group: 'appendix',
  },
  {
    number: 14,
    slug: 'appendix-cauchy',
    title: 'Appendix B: Cauchy\'s Integral Formula',
    shortTitle: 'Appendix B: Cauchy Integral',
    description: 'Cauchy\'s integral formula and the residue theorem. Essential tools for contour integration used in the Nyquist criterion and inverse Laplace/Z-transforms.',
    topics: ['Cauchy Integral Formula', 'Residue Theorem', 'Contour Integration'],
    group: 'appendix',
  },
]

export const groupLabels: Record<Chapter['group'], string> = {
  foundations: 'Foundations',
  transforms: 'Systems & Transforms',
  control: 'Control & Design',
  advanced: 'Advanced Topics',
  appendix: 'Appendices',
}

export const groupDescriptions: Record<Chapter['group'], string> = {
  foundations: 'Mathematical foundations: vector spaces, functional analysis, and distribution theory',
  transforms: 'System theory and the transform methods that power frequency-domain analysis',
  control: 'Design and realization of control systems, state-space methods, and sampling',
  advanced: 'Stability analysis and structural properties of linear systems',
  appendix: 'Reference material on integration theory and complex analysis',
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find(c => c.slug === slug)
}

export function getAdjacentChapters(slug: string) {
  const idx = chapters.findIndex(c => c.slug === slug)
  return {
    prev: idx > 0 ? chapters[idx - 1] : null,
    next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
  }
}
