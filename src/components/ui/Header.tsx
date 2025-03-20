"use client";

import React, { useEffect } from "react";
import Image from "next/image";

const Header: React.FC = () => {
    useEffect(() => {
        if (typeof window === "undefined") return;

        import("bootstrap/dist/js/bootstrap.bundle.min.js").then(
            (bootstrap) => {
                const Tooltip = bootstrap.Tooltip;
                const tooltipTriggerList = document.querySelectorAll(
                    '[data-bs-toggle="tooltip"]'
                );
                const tooltipList = Array.from(tooltipTriggerList).map(
                    (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
                );

                return () => {
                    tooltipList.forEach((tooltip) => tooltip.dispose());
                };
            }
        );
    }, []);

    return (
        <header>
            <nav className="navbar bg-primary">
                <div className="container-md container-md d-flex justify-content-between align-items-center">
                    <a
                        className="navbar-brand mb-0 h1 text-white align-items-center d-flex gap-3"
                        href="/"
                    >
                        <Image
                            src="/icons/animeforus.svg"
                            alt="Link to buymeacoffee.com"
                            width={36}
                            height={36}
                        />
                        AnimeFor.Us
                    </a>

                    <ul
                        className="navbar-nav d-flex flex-row gap-3"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        data-bs-title="Made with 💜 by Eshuo"
                    >
                        <li className="navbar-item">
                            <a
                                href="https://buymeacoffee.com/wodmat1g"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="nav-link"
                            >
                                <Image
                                    src="/icons/buymeacoffee.svg"
                                    alt="Link to buymeacoffee.com"
                                    width={36}
                                    height={36}
                                />
                            </a>
                        </li>
                        <li className="navbar-item">
                            <a
                                href="https://github.com/eshuoo/animefor.us"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="nav-link"
                            >
                                <Image
                                    src="/icons/github.svg"
                                    alt="Link to GitHub project"
                                    width={36}
                                    height={36}
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
