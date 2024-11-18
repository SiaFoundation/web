'use client'

import React, { useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'
import { Provider, ProviderCompleteData } from '../lib/dataset'

type Props = {
  dataset: Provider[]
  currentStorage: number
  currentUpload: number
  currentDownload: number
  onPointClick: (storage: number, upload: number, download: number) => void
}

interface PointData {
  position: [number, number, number]
  color: string
  size: number
  tooltip: string
  isOptimal: boolean
  cost: number
  savings: number
  provider: string
}

function Point({
  position,
  color,
  size,
  isOptimal,
  onClick,
  isHovered,
  index,
}: {
  position: [number, number, number]
  color: string
  size: number
  isOptimal: boolean
  onClick: () => void
  isHovered: boolean
  index: number
}) {
  return (
    <mesh position={position} onClick={onClick} userData={{ index }}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={isOptimal ? 1 : 0.6}
      />
    </mesh>
  )
}

function Points({
  data,
  onClick,
  onHover,
}: {
  data: PointData[]
  onClick: (x: number, y: number, z: number) => void
  onHover: (point: PointData | null) => void
}) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

  return (
    <group
      onPointerMove={(e) => {
        e.stopPropagation()
        const index = e.intersections[0]?.object?.userData?.index
        setHoveredPoint(typeof index === 'number' ? index : null)
        onHover(index !== undefined ? data[index] : null)
      }}
      onPointerOut={() => {
        setHoveredPoint(null)
        onHover(null)
      }}
    >
      {data.map((point, i) => (
        <Point
          key={i}
          {...point}
          index={i}
          onClick={() =>
            onClick(point.position[0], point.position[1], point.position[2])
          }
          isHovered={hoveredPoint === i}
        />
      ))}
    </group>
  )
}

function Axes() {
  return (
    <group>
      {/* X Axis */}
      <line>
        <bufferGeometry
          attach="geometry"
          {...makeAxisGeometry([0, 0, 0], [50, 0, 0])}
        />
        <lineBasicMaterial attach="material" color="black" />
      </line>
      <Billboard position={[50, 0, 0]}>
        <Text fontSize={3} color="black">
          Storage (50 TB)
        </Text>
      </Billboard>

      {/* Y Axis */}
      <line>
        <bufferGeometry
          attach="geometry"
          {...makeAxisGeometry([0, 0, 0], [0, 50, 0])}
        />
        <lineBasicMaterial attach="material" color="black" />
      </line>
      <Billboard position={[0, 50, 0]}>
        <Text fontSize={3} color="black">
          Upload (50 TB)
        </Text>
      </Billboard>

      {/* Z Axis */}
      <line>
        <bufferGeometry
          attach="geometry"
          {...makeAxisGeometry([0, 0, 0], [0, 0, 50])}
        />
        <lineBasicMaterial attach="material" color="black" />
      </line>
      <Billboard position={[0, 0, 50]}>
        <Text fontSize={3} color="black">
          Download (50 TB)
        </Text>
      </Billboard>
    </group>
  )
}

function makeAxisGeometry([x1, y1, z1]: number[], [x2, y2, z2]: number[]) {
  const positions = new Float32Array([x1, y1, z1, x2, y2, z2])
  return {
    attributes: {
      position: new THREE.BufferAttribute(positions, 3),
    },
  }
}

export function CostVisualization3D({
  dataset,
  currentStorage,
  currentUpload,
  currentDownload,
  onPointClick,
}: Props) {
  const [hoveredPoint, setHoveredPoint] = useState<PointData | null>(null)

  const points = useMemo(() => {
    const data: PointData[] = []

    for (let x = 1; x <= 50; x += 4) {
      for (let y = 0; y <= 50; y += 4) {
        for (let z = 0; z <= 50; z += 4) {
          const costs = dataset
            .filter((provider) => {
              return (
                provider.storage_cost_tb !== null &&
                provider.ingress_cost_tb !== null &&
                provider.egress_cost_tb !== null
              )
            })
            .map((provider: ProviderCompleteData) => ({
              provider,
              cost:
                provider.storage_cost_tb * x +
                provider.ingress_cost_tb * y +
                provider.egress_cost_tb * z,
            }))

          costs.sort((a, b) => a.cost - b.cost)
          const bestProvider = costs[0].provider
          const secondBest = costs[1]

          const advantage = (secondBest.cost - costs[0].cost) / secondBest.cost
          const size = 1.2 + advantage * 2

          const isCurrentPoint =
            Math.abs(x - currentStorage) < 2 &&
            Math.abs(y - currentUpload) < 2 &&
            Math.abs(z - currentDownload) < 2

          const point: PointData = {
            position: [x, y, z],
            color: bestProvider.color,
            size,
            tooltip: `${
              bestProvider.provider
            }\nStorage: ${x} TB\nUpload: ${y} TB\nDownload: ${z} TB\nCost: $${costs[0].cost.toFixed(
              2
            )}\nSavings: ${(advantage * 100).toFixed(1)}%`,
            isOptimal: isCurrentPoint,
            cost: costs[0].cost,
            savings: advantage * 100,
            provider: bestProvider.provider,
          }

          data.push(point)
        }
      }
    }

    return data
  }, [dataset, currentStorage, currentUpload, currentDownload])

  return (
    <div className="relative w-full">
      <div className="h-[400px]">
        <Canvas
          camera={{ position: [80, 80, 80], fov: 45 }}
          gl={{ antialias: true }}
        >
          <OrbitControls makeDefault />
          <ambientLight intensity={1} />
          <Points
            data={points}
            onClick={onPointClick}
            onHover={setHoveredPoint}
          />
          <Axes />
        </Canvas>
      </div>

      {hoveredPoint && (
        <div className="absolute bottom-4 right-4 bg-black/90 text-white px-4 py-3 rounded-lg text-sm">
          <div className="font-medium">{hoveredPoint.provider}</div>
          <div className="mt-1 text-gray-300">
            Storage: {hoveredPoint.position[0]} TB
          </div>
          <div className="text-gray-300">
            Upload: {hoveredPoint.position[1]} TB
          </div>
          <div className="text-gray-300">
            Download: {hoveredPoint.position[2]} TB
          </div>
          <div className="mt-2 font-medium">
            Cost: ${hoveredPoint.cost.toFixed(2)}
          </div>
          <div className="text-emerald-400">
            Savings: {hoveredPoint.savings.toFixed(1)}%
          </div>
          <div className="mt-2 text-xs text-gray-400">Click to set values</div>
        </div>
      )}
    </div>
  )
}
