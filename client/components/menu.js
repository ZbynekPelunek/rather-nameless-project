import Link from 'next/link';

const Menu = ({ currentUser }) => {
    const links = [
        currentUser && { label: 'Character', href: '/characters/61f5ec52db34983b6fb8fe71'},
        currentUser && { label: 'Map', href: '/world/map'},
        currentUser && { label: 'Shop', href: '/shop'},
    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, href }) => {
            return <li key={href} className="nav-item">
                <Link href={href}>
                    <a className="nav-link">{label}</a>
                </Link>
            </li>;
        });

    return (
        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <ul className="nav d-flex align-items-center">
                {links}
            </ul>
        </div>
    );
};

export default Menu;