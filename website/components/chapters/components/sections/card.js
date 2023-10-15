"use client";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Link from "next/link";
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
    ssr: false,
  
  })

  const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

const content = [
  {
    title: "Primary Card",
    text: "bg-primary-500",
  },
  {
    title: "Secondary Card ",
    bg: "bg-secondary-500",
    color: "text-secondary-500",
  },
  {
    title: "Success Card",
    bg: "bg-success-500",
    color: "text-success-500",
  },
  {
    title: "Danger Card",
    bg: "bg-danger-500",
    color: "text-danger-500",
  },
  {
    title: "Warning Card",
    bg: "bg-warning-500",
    color: "text-warning-500",
  },
  {
    title: "Info Card",
    bg: "bg-info-500",
    color: "text-info-500",
  },
];

const focus = [
    {
        title: '',
        image: '',
        text: '',
    }
];




const CardPage = ({content,focus, model, ...props}) => {
  return (
    <div className=" space-y-5">
      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 card-height-auto">
      {content.map((item, i) => (
          <Card
            title={item.title}
            titleClass="text-white"
            className="bg-slate-800"
            key={i}
            noborder
          >
            <div className="text-white text-sm">
             {item.text}
            </div>
          </Card>
        ))}
        
      </div>
      <div className="grid gap-4 grid-cols-12 mt-5">
        <div className="xl:col-span-8 col-span-12">
          <Card>
            <div className="post-image mb-6">
              <img
                src={focus.image}
                alt=""
                className=" w-full h-full block object-cover"
              />
            </div>
            <h5 className="card-title text-slate-900 dark:text-white">
              {focus.title}
            </h5>
            <div className="card-text mt-4">
              <p>
              {focus.text}
              </p>
        
            </div>
          </Card>
        </div>
        <div className="xl:col-span-4 col-span-12 space-y-4">
          <Card>
            <div className="mb-6">
            <View >
            <Suspense fallback={null}>
              
              <Common />
            </Suspense>
          </View>
          
            </div>
            <div className="flex justify-between mb-4">
              <div>
                <div className="text-xl text-slate-900 dark:text-white">
                  Lorem ipsum
                </div>
              </div>
              <Link href="#">
                <span className="inline-flex leading-5 text-slate-500 dark:text-slate-400 text-sm font-normal">
                  <Icon
                    icon="heroicons-outline:calendar"
                    className="text-secondary-500 ltr:mr-2 rtl:ml-2 text-lg"
                  />
                  10/02/2021
                </span>
              </Link>
            </div>

            <div className="card-text mt-4">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="mt-4 space-x-4 rtl:space-x-reverse">
          
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex justify-between mb-4">
              <div>
                <div className="text-xl text-slate-900 dark:text-white">
                  Lorem ipsum
                </div>
              </div>
              <Link href="#">
                <span className="inline-flex leading-5 text-slate-500 dark:text-slate-400 text-sm font-normal">
                  <Icon
                    icon="heroicons-outline:calendar"
                    className="text-secondary-500 ltr:mr-2 rtl:ml-2 text-lg"
                  />
                  10/02/2021
                </span>
              </Link>
            </div>

            <div className="card-text mt-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip.Lorem ipsum dolor sit amet, consectetur
                adipiscing eli.
              </p>
              <div className="mt-6 flex justify-between">
                <Link href="#" className="btn-link">
                  Learn more
                </Link>
                <div className="flex space-x-4 rtl:space-x-reverse">
         
     
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>


    </div>
  );
};

export default CardPage;
