import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import {
  Definition,
  Theorem,
  Lemma,
  Corollary,
  Proposition,
  Proof,
  Example,
  Remark,
  Solution,
  Problem,
} from '@/components/mdx'
import FourierTransformGrid from '@/components/visualizations/FourierTransformGrid'
import SamplingDemo from '@/components/visualizations/SamplingDemo'
import FeedbackDiagram from '@/components/visualizations/FeedbackDiagram'
import ROCVisualization from '@/components/visualizations/ROCVisualization'
import ConvolutionDemo from '@/components/visualizations/ConvolutionDemo'
import NormBalls from '@/components/visualizations/NormBalls'
import ProjectionVisualization from '@/components/visualizations/ProjectionVisualization'
import StabilityRegions from '@/components/visualizations/StabilityRegions'
import BodePlotDemo from '@/components/visualizations/BodePlotDemo'
import FourierSeriesDemo from '@/components/visualizations/FourierSeriesDemo'
import ApproximateIdentityDemo from '@/components/visualizations/ApproximateIdentityDemo'
import ImpulseStepResponse from '@/components/visualizations/ImpulseStepResponse'
import LyapunovDemo from '@/components/visualizations/LyapunovDemo'
import CourseMindmap from '@/components/visualizations/CourseMindmap'
import InteriorClosureBoundary from '@/components/visualizations/InteriorClosureBoundary'
import EpsilonDelta from '@/components/visualizations/EpsilonDelta'
import UniformVsPointwise from '@/components/visualizations/UniformVsPointwise'
import OpenCover from '@/components/visualizations/OpenCover'
import JacobianDiagram from '@/components/visualizations/JacobianDiagram'
import GradientContour from '@/components/visualizations/GradientContour'
import HessianClassification from '@/components/visualizations/HessianClassification'
import LagrangeDemo from '@/components/visualizations/LagrangeDemo'
import DarbouxSums from '@/components/visualizations/DarbouxSums'

const components = {
  Definition,
  Theorem,
  Lemma,
  Corollary,
  Proposition,
  Proof,
  Example,
  Remark,
  Solution,
  Problem,
  FourierTransformGrid,
  SamplingDemo,
  FeedbackDiagram,
  ROCVisualization,
  ConvolutionDemo,
  NormBalls,
  ProjectionVisualization,
  StabilityRegions,
  BodePlotDemo,
  FourierSeriesDemo,
  ApproximateIdentityDemo,
  ImpulseStepResponse,
  LyapunovDemo,
  CourseMindmap,
  InteriorClosureBoundary,
  EpsilonDelta,
  UniformVsPointwise,
  OpenCover,
  JacobianDiagram,
  GradientContour,
  HessianClassification,
  LagrangeDemo,
  DarbouxSums,
}

export default function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose-content">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkMath, remarkGfm],
            rehypePlugins: [rehypeKatex as never],
          },
        }}
        components={components}
      />
    </div>
  )
}
