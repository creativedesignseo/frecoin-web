import AboutHero from '../sections/about/AboutHero'
import InnovationSection from '../sections/about/InnovationSection'
import ImpactStatsSection from '../sections/about/ImpactStatsSection'
import TeamSection from '../sections/about/TeamSection'
import MissionVisionSection from '../sections/about/MissionVisionSection'
import ImpactSection from '../sections/about/ImpactSection'
import ProjectsPreviewSection from '../sections/about/ProjectsPreviewSection'
import TestimonialsSection from '../sections/about/TestimonialsSection'

export default function About() {
  return (
    <div className="min-h-[100dvh]">
      <AboutHero />
      <InnovationSection />
      <ImpactStatsSection />
      <TeamSection />
      <MissionVisionSection />
      <ImpactSection />
      <ProjectsPreviewSection />
      <TestimonialsSection />
    </div>
  )
}
