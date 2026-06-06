import Hero from '@/components/Hero';
import MarqueeBand from '@/components/MarqueeBand';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Quality from '@/components/Quality';

export default function Homepage() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <Stats />
      <Services />
      <Process />
      <Quality />
    </>
  );
}
