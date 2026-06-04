const navigation = `
<header class="site-header">
    <nav class="navigation">
        <a href="../index.html" class="logo">Ben Lai</a>

        <ul class="nav-list">
            <li>
                <a href="../index.html">Home</a>
            </li>

            <li>
                <a href="./projects.html">Projects</a>
            </li>

            <li>
                <a href="./about.html">About</a>
            </li>

            <li>
                <a href="./contact.html">Contact</a>
            </li>
        </ul>

        <button id="theme-toggle">
            Toggle Theme
        </button>
    </nav>
</header>
`;

const navContainer = document.querySelector("#nav-container");

navContainer.innerHTML = navigation;
