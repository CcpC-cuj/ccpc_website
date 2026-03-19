import { useEffect, useRef } from "react";

const members = [
  {
    name: "RAJ PANDIT",
    dept: "EE",
    batch: "2025",
    reg: "25210705038",
  },
  {
    name: "Priyanshu Kumar",
    dept: "CSE",
    batch: "2025",
    reg: "25190503022",
  },
  {
    name: "Jinkuntala Tejaswini",
    dept: "CSE",
    batch: "2025",
    reg: "25190503016",
  },
  {
    name: "Hari Om",
    dept: "CSE",
    batch: "2025",
    reg: "25190503045",
  },
  {
    name: "Ganadhip Garai",
    dept: "CSE",
    batch: "2025",
    reg: "25190503015",
  },
  {
    name: "Siddharth Das",
    dept: "CSE",
    batch: "2025",
    reg: "25190503036",
  },
  {
    name: "Tarun Kumar",
    dept: "CSE",
    batch: "2025",
    reg: "25190503043",
  },
  {
    name: "Nikhil",
    dept: "CSE",
    batch: "2025",
    reg: "25190503019",
  },
  {
    name: "Shreya Sneha",
    dept: "CSE",
    batch: "2025",
    reg: "25190503034",
  },
  {
    name: "Prithvi Raj Singha",
    dept: "CSE",
    batch: "2025",
    reg: "25190503021",
  },
  {
    name: "Sonu Kumari",
    dept: "CSE",
    batch: "2025",
    reg: "25190503037",
  },
  {
    name: "Pragati Priya",
    dept: "CSE",
    batch: "2025",
    reg: "25190503020",
  },

  {
    name: "Ritika Roy",
    dept: "CSE",
    batch: "2025",
    reg: "25190503028",
  },

  {
    name: "Prince kumar",
    dept: "CSE",
    batch: "2025",
    reg: "25190503044",
  },
  {
    name: "MANISH VISHVKARMA",
    dept: "CSE",
    batch: "2025",
    reg: "25190503018",
  },
  {
    name: "Raunak",
    dept: "CSE",
    batch: "2025",
    reg: "25190503024",
  },
  {
    name: "Krishna Shaw",
    dept: "CSE",
    batch: "2025",
    reg: "25190503041",
  },
  {
    name: "Pawan Pratap Singh",
    dept: "CSE",
    batch: "2024",
    reg: "24190503038",
  },
  {
    name: "Aniket kumar",
    dept: "CSE",
    batch: "2024",
    reg: "24190503008",
  },
  {
    name: "Arghyadipta Das",
    dept: "EE",
    batch: "2024",
    reg: "24210503025",
  },
];


export default function NewMembers() {
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;

    const scroll = () => {
      if (!container) return;

      container.scrollLeft += 0.5;

      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft -= container.scrollWidth / 2;
      }
    };

    intervalRef.current = setInterval(scroll, 16);

    return () => clearInterval(intervalRef.current);
  }, []);

  const pauseScroll = () => {
    clearInterval(intervalRef.current);
  };

  const resumeScroll = () => {
    const container = scrollRef.current;

    intervalRef.current = setInterval(() => {
      if (!container) return;

      container.scrollLeft += 0.5;

      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft -= container.scrollWidth / 2;
      }
    }, 16);
  };

  return (
    <section className="text-white mt-12 px-4 lg:px-16">
      <div className="mx-auto">

        <h2 className="text-3xl font-bold text-center mb-10">
          Welcome Our New Members
        </h2>

        <div
          ref={scrollRef}
          onMouseEnter={pauseScroll}
          onMouseLeave={resumeScroll}
          className="flex gap-6 overflow-x-hidden"
        >
          {[...members, ...members].map((m, i) => (
            <div
              key={i}
              className="min-w-[280px] bg-blue-500/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:shadow-indigo-500/20 transition"
            >
              <h3 className="text-xl font-semibold text-indigo-400">
                {m.name}
              </h3>

              <div className="mt-4 text-gray-300 text-sm space-y-1">
                <p><span className="font-medium">Department:</span> {m.dept}</p>
                <p><span className="font-medium">Batch:</span> {m.batch}</p>
                <p><span className="font-medium">Reg No:</span> {m.reg}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}