import React, { useMemo } from 'react'
import Lottie from 'lottie-react'
import afterEffectsRaw from '../assets/lottie/after-effects.json?raw'
import premiereProRaw from '../assets/lottie/premiere-pro.json?raw'
import photoshopRaw from '../assets/lottie/photoshop.json?raw'
import illustratorRaw from '../assets/lottie/illustrator.json?raw'
import xdRaw from '../assets/lottie/xd.json?raw'
import figmaRaw from '../assets/lottie/figma.json?raw'

const toolSources = [
	['After Effects', afterEffectsRaw],
	['Premiere Pro', premiereProRaw],
	['Photoshop', photoshopRaw],
	['Illustrator', illustratorRaw],
	['Adobe XD', xdRaw],
	['Figma', figmaRaw],
]

const parseAnimation = (raw) => {
	const text = String(raw ?? '').trim()
	const start = text.indexOf('{')
	const end = text.lastIndexOf('}')

	if (start === -1 || end === -1 || end <= start) return null

	try {
		return JSON.parse(text.slice(start, end + 1))
	} catch {
		return null
	}
}

export default function CreativeToolsBar() {
	const animations = useMemo(
		() =>
			toolSources
				.map(([name, raw]) => ({ name, data: parseAnimation(raw) }))
				.filter((item) => item.data),
		[],
	)

	return (
		<section id="tools" className="py-8">
			<div className="mx-auto max-w-7xl px-6">
				<div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
					<style>{`
						@keyframes marqueeLTR {
							from { transform: translateX(-50%); }
							to { transform: translateX(0%); }
						}
						.marquee-anim {
							width: 200%;
							display: flex;
							align-items: center;
							animation: marqueeLTR 22s linear infinite;
						}
						.marquee-inner {
							display: flex;
							gap: 1.5rem;
							align-items: center;
							width: 100%;
						}
						.tool-card {
							flex: 0 0 72px;
							width: 72px;
							height: 72px;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 9999px;
							background: rgba(255, 255, 255, 0.04);
						}
					`}</style>

					<div className="marquee-anim">
						<div className="marquee-inner">
							{animations.concat(animations).map((anim, idx) => (
								<div key={`${anim.name}-${idx}`} className="tool-card">
									<Lottie animationData={anim.data} loop style={{ width: 56, height: 56 }} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
