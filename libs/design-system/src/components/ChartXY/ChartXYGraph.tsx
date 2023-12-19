'use client'

import { Fragment } from 'react'
import { LinearGradient } from '@visx/gradient'
import { Text } from '../../core/Text'
import { ChartXYProps } from './useChartXY'
import { Separator } from '../../core/Separator'
import { PatternLines } from '@visx/pattern'
import { cx } from 'class-variance-authority'
import { groupBy } from 'lodash-es'
import { ChartConfig, ChartPoint } from './types'
import { humanDate } from '@siafoundation/units'

export function ChartXYGraph<Key extends string, Cat extends string>({
  id,
  width,
  height,
  accessors,
  animationTrajectory,
  curve,
  data,
  config,
  scales,
  enabledGraph,
  enabledTip,
  isStack,
  todayOffset,
  numTicks,
  renderAreaSeries,
  renderAreaStack,
  renderBarGroup,
  renderBarStack,
  enableTooltipGlyph,
  renderTooltipGlyph,
  renderLineSeries,
  sharedTooltip,
  showHorizontalCrosshair,
  showTooltip,
  showVerticalCrosshair,
  snapTooltipToDatum,
  stackOffset,
  margin,
  theme,
  xAxisOrientation,
  yAxisOrientation,
  AreaSeries,
  AreaStack,
  Axis,
  BarGroup,
  BarSeries,
  BarStack,
  Grid,
  LineSeries,
  Tooltip,
  XYChart,
}: ChartXYProps<Key, Cat> & { width: number; height: number }) {
  return (
    <XYChart
      theme={theme.xyChartTheme}
      xScale={scales.x}
      yScale={scales.y}
      height={Math.min(400, height)}
      margin={margin}
      captureEvents
    >
      <g
        key={`today-line-${width}-${height}`} // force animate on update
      >
        <rect
          className="fill-gray-600 dark:fill-graydark-600 h-full w-px y-0"
          style={{
            // x:
            left: `${todayOffset * 100}%`,
          }}
        />
      </g>
      <LinearGradient
        id={'gradient-default'}
        from={'gray'}
        fromOpacity={1}
        to={'gray'}
        toOpacity={0.4}
      />
      {Object.entries(config.data).map(([key, val]) => {
        const color = (val as { color?: string }).color
        return (
          <Fragment key={key}>
            <PatternLines
              id={`pattern-${getIdKey(id, key)}`}
              height={6}
              width={6}
              stroke={color}
              strokeWidth={0.5}
              orientation={['diagonal']}
            />
            <LinearGradient
              id={`gradient-${getIdKey(id, key)}`}
              from={color}
              fromOpacity={1}
              to={color}
              toOpacity={isStack ? 0.4 : 1}
            />
          </Fragment>
        )
      })}
      <Grid
        key={`grid-${animationTrajectory}`} // force animate on update
        rows={false}
        columns={true}
        strokeDasharray="1,3"
        animationTrajectory={animationTrajectory}
        numTicks={numTicks}
      />
      {renderBarStack && (
        <BarStack offset={config.stackOffset}>
          {enabledGraph.map((key) => (
            <BarSeries
              key={key}
              dataKey={key}
              data={data}
              xAccessor={accessors.x[key]}
              yAccessor={accessors.y[key]}
              colorAccessor={() => getColor(id, key, config)}
            />
          ))}
        </BarStack>
      )}
      {renderBarGroup && (
        <BarGroup>
          {enabledGraph.map((key) => (
            <BarSeries
              key={key}
              dataKey={key}
              data={data}
              xAccessor={accessors.x[key]}
              yAccessor={accessors.y[key]}
              colorAccessor={() => getColor(id, key, config)}
            />
          ))}
        </BarGroup>
      )}
      {renderAreaSeries && (
        <>
          {enabledGraph.map((key) => (
            <AreaSeries
              key={key}
              dataKey={key}
              data={data}
              xAccessor={accessors.x[key]}
              yAccessor={accessors.y[key]}
              stroke={getColor(id, key, config)}
              fill={getColor(id, key, config)}
              curve={curve}
            />
          ))}
        </>
      )}
      {renderAreaStack && (
        <AreaStack
          curve={curve}
          offset={config.stackOffset}
          renderLine={stackOffset !== 'wiggle'}
        >
          {enabledGraph.map((key) => (
            <AreaSeries
              key={key}
              dataKey={key}
              data={data}
              xAccessor={accessors.x[key]}
              yAccessor={accessors.y[key]}
              stroke={getColor(id, key, config)}
              fill={getColor(id, key, config)}
            />
          ))}
        </AreaStack>
      )}
      {renderLineSeries && (
        <>
          {enabledGraph.map((key) => (
            <LineSeries
              key={key}
              dataKey={key}
              data={data}
              xAccessor={accessors.x[key]}
              yAccessor={accessors.y[key]}
              stroke={config.data?.[key]?.color || 'gray'}
              curve={curve}
            />
          ))}
        </>
      )}
      <Axis
        key={`time-axis-${animationTrajectory}`}
        orientation={xAxisOrientation}
        numTicks={numTicks}
        animationTrajectory={animationTrajectory}
        tickFormat={(d) => humanDate(d)}
        tickLength={12}
        tickLabelProps={(p) => ({
          ...p,
          fill: theme.labels.color,
          fontFamily: theme.labels.fontFamily,
          y: '14px',
          fontWeight: '500',
          fontSize: '8',
        })}
      />
      <Axis
        key={`temp-axis-${animationTrajectory}`}
        label={
          stackOffset == null
            ? 'SC'
            : stackOffset === 'expand'
            ? 'Fraction of total'
            : ''
        }
        orientation={yAxisOrientation}
        numTicks={numTicks}
        tickLength={12}
        // rangePadding={0}
        animationTrajectory={animationTrajectory}
        // values don't make sense in stream graph
        // tickFormat={stackOffset === 'wiggle' ? () => '' : undefined}
        tickFormat={config.formatTickY}
        tickTransform={`translate(-300px, 0)`}
        tickLabelProps={(p) => ({
          ...p,
          fill: theme.labels.color,
          fontFamily: theme.labels.fontFamily,
          // x: '-34px',
          fontWeight: '500',
          fontSize: '8',
        })}
      />
      {showTooltip && (
        <Tooltip<ChartPoint<Key>>
          showHorizontalCrosshair={showHorizontalCrosshair}
          showVerticalCrosshair={showVerticalCrosshair}
          snapTooltipToDatumX={snapTooltipToDatum}
          snapTooltipToDatumY={snapTooltipToDatum}
          showDatumGlyph={snapTooltipToDatum && !renderBarGroup}
          showSeriesGlyphs={sharedTooltip && !renderBarGroup}
          renderGlyph={enableTooltipGlyph ? renderTooltipGlyph : undefined}
          renderTooltip={({ tooltipData }) => {
            const nearestDatum = tooltipData?.nearestDatum?.datum
            const nearestKey = tooltipData?.nearestDatum?.key
            const keys = (
              sharedTooltip ? enabledTip : nearestKey ? [nearestKey] : []
            ) as Key[]

            const formatTimestamp =
              config.formatTimestamp ||
              ((v) =>
                humanDate(v, {
                  timeStyle: 'short',
                  hour12: false,
                }))

            type KeyOption = { key: Key; category: Cat }
            const options = keys.map(
              (key) =>
                ({
                  key,
                  category: config.data?.[key]?.category || '',
                } as KeyOption)
            )

            const keyGroups = groupBy(options, 'category')

            const keyGroupOrderedList = (
              config.categories
                ? config.categories.map((cat) => [cat, keyGroups[cat]])
                : Object.entries(keyGroups)
            ) as [Cat, KeyOption[]][]

            return (
              <div className={cx('flex flex-col gap-2 py-1')}>
                <Text
                  font="mono"
                  size="12"
                  color="contrast"
                  className="text-end"
                >
                  {nearestDatum
                    ? formatTimestamp(accessors.date(nearestDatum))
                    : 'No date'}
                </Text>
                <Separator color="panel" className="w-full" />
                <div
                  className={cx(
                    'grid gap-x-6 gap-y-4',
                    keyGroupOrderedList.length > 1
                      ? 'grid-cols-2'
                      : 'grid-cols-1'
                  )}
                >
                  {keyGroupOrderedList.map(([group, keys]) => {
                    const total = nearestDatum
                      ? keys.reduce((acc, { key }) => {
                          const val = accessors['y'][key](nearestDatum)
                          if (val == null || Number.isNaN(val)) {
                            return acc
                          }
                          return acc + val
                        }, 0)
                      : 0
                    const Component = config?.formatComponent

                    return (
                      <div
                        key={group}
                        className="flex flex-col gap-2 w-[250px]"
                      >
                        {group && <Text weight="semibold">{group}</Text>}
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 items-center">
                          {keys.map(({ key }) => {
                            const val =
                              nearestDatum && accessors['y'][key](nearestDatum)

                            return (
                              <Fragment key={key}>
                                <Text
                                  color="accent"
                                  style={{
                                    color: config.data?.[key]?.color,
                                  }}
                                  className={cx(
                                    nearestKey === key ? 'underline' : ''
                                  )}
                                >
                                  {config.data?.[key]?.label || key}
                                </Text>
                                <Text
                                  size="12"
                                  style={{
                                    textAlign: 'end',
                                  }}
                                  className={cx(
                                    nearestKey === key ? 'underline' : ''
                                  )}
                                >
                                  {val == null || Number.isNaN(val) ? (
                                    '–'
                                  ) : Component ? (
                                    <Component value={val} />
                                  ) : config.format ? (
                                    config.format(val)
                                  ) : (
                                    val
                                  )}
                                </Text>
                              </Fragment>
                            )
                          })}
                          {keys.length > 1 && isStack && (
                            <>
                              <Text className="pt-2">total</Text>
                              <Text
                                size="12"
                                weight="bold"
                                className="pt-2 text-end"
                              >
                                {Component ? (
                                  <Component value={total} />
                                ) : config.format ? (
                                  config.format(total)
                                ) : (
                                  total
                                )}
                              </Text>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }}
        />
      )}
    </XYChart>
  )
}

function getIdKey(id: string, key: string) {
  return `${id}-${key}`
}

export function getColor<Key extends string, Cat extends string>(
  id: string,
  key: Key,
  config: ChartConfig<Key, Cat>
) {
  const idKey = getIdKey(id, key)

  if (!config.data?.[key]) {
    return `url(#gradient-default)`
  }

  return config.data[key].pattern
    ? `url(#pattern-${idKey})`
    : `url(#gradient-${idKey})`
}
