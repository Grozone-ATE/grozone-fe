import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import AppData from "@data/app.json";
import { useRouter } from 'next/router';

const ClientNavigation = () => {
  const [mounted, setMounted] = useState(false);
  const [asPath, setAsPath] = useState('');
  const router = useRouter();
  const navRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    if (router.isReady) {
      setAsPath(router.asPath);
    }
  }, [router.isReady, router.asPath]);

  // Update active classes after mount
  useEffect(() => {
    if (!mounted || !navRef.current || !asPath) return;

    const menuItems = navRef.current.querySelectorAll('li[data-menu-index]');
    menuItems.forEach((menuItem) => {
      const index = parseInt(menuItem.getAttribute('data-menu-index'));
      const item = AppData.header.menu[index];
      if (item) {
        const isActive = (asPath.indexOf(item.link) !== -1 && item.link !== '/') || asPath === item.link;
        if (isActive) {
          menuItem.classList.add('mil-active');
        } else {
          menuItem.classList.remove('mil-active');
        }
      }
    });

    const submenuItems = navRef.current.querySelectorAll('li[data-submenu-index]');
    submenuItems.forEach((submenuItem) => {
      const parentIndex = parseInt(submenuItem.getAttribute('data-parent-index'));
      const submenuIndex = parseInt(submenuItem.getAttribute('data-submenu-index'));
      const item = AppData.header.menu[parentIndex];
      if (item && Array.isArray(item.children) && item.children[submenuIndex]) {
        const subitem = item.children[submenuIndex];
        const isActive = (asPath.indexOf(subitem.link) !== -1 && subitem.link !== '/') || asPath === subitem.link;
        if (isActive) {
          submenuItem.classList.add('mil-active');
        } else {
          submenuItem.classList.remove('mil-active');
        }
      }
    });
  }, [mounted, asPath]);

  // Attach click handlers for parent menu items only
  useEffect(() => {
    if (!mounted || !navRef.current) return;

    // Only attach handlers to parent links (direct children of .mil-has-children)
    const parentLinks = navRef.current.querySelectorAll('.mil-has-children > a');
    const cleanupFunctions = [];

    parentLinks.forEach((link) => {
      const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const lists = navRef.current.querySelectorAll('.mil-has-children ul');
        lists.forEach((list) => {
            if (list !== link.parentNode.querySelector('ul')) {
              list.classList.remove('mil-active');
            }
        });

        const allLinks = navRef.current.querySelectorAll('.mil-has-children > a');
        allLinks.forEach((l) => {
            if (l !== link) {
              l.classList.remove('mil-active');
            }
        });

        link.classList.toggle('mil-active');
        const parentLi = link.closest('li');
        if (parentLi) {
          const submenu = parentLi.querySelector('ul');
          if (submenu) {
            submenu.classList.toggle('mil-active');
          }
        }
      };
      link.addEventListener('click', handleClick);
      cleanupFunctions.push(() => link.removeEventListener('click', handleClick));
    });

    // Close sub-menus when clicking on sub-menu items (they will navigate)
    const subMenuLinks = navRef.current.querySelectorAll('.mil-has-children ul li a');
    subMenuLinks.forEach((subLink) => {
      const handleSubClick = () => {
        // Close all sub-menus when navigating
        const lists = navRef.current.querySelectorAll('.mil-has-children ul');
        lists.forEach((list) => {
          list.classList.remove('mil-active');
        });
        const allParentLinks = navRef.current.querySelectorAll('.mil-has-children > a');
        allParentLinks.forEach((l) => {
          l.classList.remove('mil-active');
        });
      };
      subLink.addEventListener('click', handleSubClick);
      cleanupFunctions.push(() => subLink.removeEventListener('click', handleSubClick));
    });

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <nav className="mil-main-menu" id="swupMenu">
        <ul>
            {AppData.header.menu.map((item, key) => {
              const hasChildren = Array.isArray(item.children) && item.children.length > 0;
              return (
                <li className={hasChildren ? 'mil-has-children' : ''} key={`header-menu-item-${key}`}>
                    <a href={item.link || '/'}>
                      {item.label}
                    </a>
                    {hasChildren && item.children && (
                      <ul>
                          {item.children.map((subitem, key2) => (
                            <li key={`header-submenu${key}-item-${key2}`}>
                                <a href={subitem.link || '/'}>{subitem.label}</a>
                            </li>
                          ))}
                      </ul>
                    )}
                </li>
              );
            })}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="mil-main-menu" id="swupMenu" ref={navRef}>
      <ul>
          {AppData.header.menu.map((item, key) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            return (
              <li className={hasChildren ? 'mil-has-children' : ''} key={`header-menu-item-${key}`} data-menu-index={key}>
                  <Link href={item.link || '/'}>
                    {item.label}
                  </Link>
                  {hasChildren && item.children && (
                    <ul>
                        {item.children.map((subitem, key2) => (
                          <li key={`header-submenu${key}-item-${key2}`} data-parent-index={key} data-submenu-index={key2}>
                              <Link href={subitem.link || '/'}>{subitem.label}</Link>
                          </li>
                        ))}
                    </ul>
                  )}
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default ClientNavigation;


