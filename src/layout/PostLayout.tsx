"use client";

import DesktopTopBar from "@/components/DesktopTopbar";
import MobileTopBar from "@/components/MobileTopbar";
import useMediaQuery from "@/hooks/useMediaQuery";
import Link from "next/link";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

export default function PostLayout({
  children,
  active,
}: {
  children: React.ReactNode;
  active: number;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <div>{isMobile ? <MobileTopBar /> : <DesktopTopBar />}</div>
      <div id="app" style={{ height: "100vh", display: "flex" }}>
        {isMobile ? (
          <></>
        ) : (
          <Sidebar
            style={{
              height: "100vh",
              backgroundColor: "#F0F0F0",
            }}
          >
            <Menu>
              <MenuItem
                icon={<HomeOutlinedIcon />}
                active={active === 0}
                style={{
                  backgroundColor: active === 0 ? "#e0e0e0" : undefined,
                }}
              >
                <Link href="/post">Home</Link>
              </MenuItem>
              <MenuItem
                icon={<PeopleOutlinedIcon />}
                active={active === 1}
                style={{
                  backgroundColor: active === 1 ? "#e0e0e0" : undefined,
                }}
              >
                <Link href="/ourblog">Our Blog</Link>
              </MenuItem>
            </Menu>
          </Sidebar>
        )}

        <main className="bg-brand-gray-100 w-[100vw]">{children}</main>
      </div>
    </>
  );
}
