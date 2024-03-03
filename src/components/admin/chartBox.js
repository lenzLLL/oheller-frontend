import React from 'react'
import { useRouter } from 'next/navigation'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUsers } from 'react-icons/fa';

export default function ChartBox({icon,title,number}) {
    const router = useRouter()
    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
    return (
    <div className='chartBox flex h-[100%]'>
        <div className='boxInfos flex-[3] flex flex-col justify-between'>
            <div className='title flex items-center gap-[10px]'>
                {icon}
                <span>{title}</span>
            </div>
            <h1 className='font-bold text-2xl text-gray-300'>{number}</h1>
            <span className='text-green-200' onClick = {()=>router.push("/")}>Voir tout</span>         
        </div>
        <div className='chartInfos flex-[2] flex flex-col justify-between'>
            <div className='chart w-[100%] h-[200px]'>
            <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Tooltip contentStyle={{background:"transparent",border:"none"}}/>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
             </ResponsiveContainer>
            </div>

        </div>
    </div>
  )
}
