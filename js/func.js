document.addEventListener("DOMContentLoaded", () => {
            const sections = document.querySelectorAll(".section");
            const contents = document.querySelectorAll(".content");
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let sectionId = entry.target.getAttribute("data-section");
                        contents.forEach(content => {
                            content.setAttribute("data-active", content.getAttribute("data-section") === sectionId ? "true" : "false");
                        });
                    }
                });
            }, { threshold: 0.6 });
            
            sections.forEach(section => observer.observe(section));
        });