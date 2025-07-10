tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary': '#3B82F6',
                        'secondary': '#06B6D4',
                        'accent': '#10B981',
                        'light': '#F1F5F9',
                        'dark': '#0F172A'
                    },
                    fontFamily: {
                        'sans': ['Poppins', 'sans-serif']
                    }
                }
            }
        }
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            primary: '#3b82f6',
                        }
                    }
                }
            }
            