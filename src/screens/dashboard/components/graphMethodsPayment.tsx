import { ResponsiveRadialBar } from '@nivo/radial-bar'

const DATA = [
    {
        "id": "À vista",
        "data": [
            {
                "x": "Dinheiro",
                "y": 139
            },
            {
                "x": "Cartão crédito",
                "y": 145
            },
            {
                "x": "Cartão débito",
                "y": 245
            },
            {
                "x": "Pix",
                "y": 15
            }
            ,
            {
                "x": "Picpay",
                "y": 15
            }
        ]
    },
    {
        "id": "À prazo",
        "data": [
            {
                "x": "Dinheiro",
                "y": 144
            },
            {
                "x": "Cartão crédito",
                "y": 151
            },
            {
                "x": "Cartão débito",
                "y": 225
            },
            {
                "x": "Pix",
                "y": 195
            },
            {
                "x": "Picpay",
                "y": 30
            }
        ]
    },
    {
        "id": "Gratuito",
        "data": [
            {
                "x": "Dinheiro",
                "y": 235
            },
            {
                "x": "Cartão crédito",
                "y": 53
            },
            {
                "x": "Cartão débito",
                "y": 240
            },
            {
                "x": "Pix",
                "y": 124
            },
            {
                "x": "Picpay",
                "y": 40
            }
        ]
    },

]
const GraphMethodsPayment = ({ data = DATA }) => (
    <ResponsiveRadialBar
        data={data}
        valueFormat=">-.2f"
        padding={0.4}
        cornerRadius={2}
        margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
        radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 80,
                translateY: 0,
                itemsSpacing: 6,
                itemDirection: 'left-to-right',
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                symbolSize: 18,
                symbolShape: 'square',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)

export default GraphMethodsPayment