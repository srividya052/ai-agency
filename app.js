document.addEventListener('DOMContentLoaded', () => {
	const posts = [
		{
			id: 1,
			title: 'Building Agentic Systems',
			category: 'Architecture',
			description: 'Designing scalable agentic architectures for real-world workflows and autonomous agents.',
			image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
			url: '#'
		},
		{
			id: 2,
			title: 'Fine-tuning for Performance',
			category: 'ML',
			description: 'Practical tips for fine-tuning models to improve latency and accuracy for production.',
			image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
			url: '#'
		},
		{
			id: 3,
			title: 'Prompt Engineering Patterns',
			category: 'Design',
			description: 'Reusable prompt patterns that make language models more reliable and focused.',
			image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
			url: '#'
		},
		{
			id: 4,
			title: 'Evaluating Model Safety',
			category: 'Safety',
			description: 'Methodologies for evaluating model safety and reducing unintended outputs.',
			image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
			url: '#'
		},
		{
			id: 5,
			title: 'Data Pipelines for AI',
			category: 'Data',
			description: 'Building robust data pipelines for training and continuous model updates.',
			image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
			url: '#'
		},
		{
			id: 6,
			title: 'Human-in-the-loop Workflows',
			category: 'Product',
			description: 'Designing effective human-in-the-loop systems for high-quality outputs.',
			image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
			url: '#'
		}
	];

	const grid = document.getElementById('blog-grid');
	const searchInput = document.getElementById('search-input');

	function createCard(post) {
		const card = document.createElement('article');
		card.className = 'rounded-lg overflow-hidden shadow-lg bg-white/5 border border-gray-800';

		card.innerHTML = `
			<div class="relative">
				<img src="${post.image}" alt="${post.title}" class="w-full blog-image">
				<div class="absolute -bottom-3 left-4 px-3 py-1 rounded-md bg-black/40 text-xs text-gray-200 border border-gray-700">${post.category}</div>
			</div>
			<div class="p-4">
				<h3 class="text-lg font-semibold text-white mb-2">${post.title}</h3>
				<p class="text-sm text-gray-300 mb-4">${post.description}</p>
				<div class="text-right">
					<a href="${post.url}" class="inline-block px-4 py-2 rounded-md bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:opacity-90">Read More</a>
				</div>
			</div>
		`;

		return card;
	}

	function render(list) {
		grid.innerHTML = '';
		if (!list.length) {
			grid.innerHTML = '';
			const noResults = document.createElement('div');
			noResults.className = 'col-span-full flex flex-col items-center justify-center py-12 text-center';
			noResults.innerHTML = `
				<svg class="w-12 h-12 mb-4 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
				<p class="text-gray-400 text-lg font-medium">No matching articles found</p>
			`;
			noResults.setAttribute('role','status');
			grid.appendChild(noResults);
			return;
		}

		const frag = document.createDocumentFragment();
		list.forEach(post => {
			frag.appendChild(createCard(post));
		});
		grid.appendChild(frag);
	}

	function filterPosts(query) {
		const q = query.trim().toLowerCase();
		if (!q) return posts;
		return posts.filter(p => (
			p.title.toLowerCase().includes(q) ||
			p.category.toLowerCase().includes(q) ||
			p.description.toLowerCase().includes(q)
		));
	}

	// Initial render
	render(posts);

	// Real-time filtering
	searchInput.addEventListener('input', (e) => {
		const filtered = filterPosts(e.target.value);
		render(filtered);
	});

	// FAQ Accordion
	const faqData = [
		{
			id: 1,
			question: 'What AI services does AI Nexus offer?',
			answer: 'AI Nexus provides comprehensive AI solutions including automation workflows, intelligent chatbot development, machine learning models, data pipeline optimization, and human-in-the-loop systems tailored to your business needs.'
		},
		{
			id: 2,
			question: 'How long does it take to implement an AI solution?',
			answer: 'Implementation timelines vary based on project complexity. Simple chatbots typically take 2-4 weeks, while complex automation systems may take 2-3 months. We provide detailed timelines after initial consultation.'
		},
		{
			id: 3,
			question: 'What industries do you serve?',
			answer: 'We serve diverse industries including fintech, healthcare, e-commerce, logistics, manufacturing, and education. Our AI solutions are customizable for any sector requiring intelligent automation and data-driven insights.'
		},
		{
			id: 4,
			question: 'How do you ensure data security and privacy?',
			answer: 'Security is paramount. We implement end-to-end encryption, follow GDPR and data protection regulations, conduct regular security audits, and use secure cloud infrastructure with enterprise-grade access controls.'
		},
		{
			id: 5,
			question: 'Can I scale the solution as my business grows?',
			answer: 'Absolutely. Our AI solutions are built with scalability in mind. They can handle increased data volume and user load while maintaining performance, and we provide continuous optimization and updates.'
		},
		{
			id: 6,
			question: 'What kind of support do you provide after deployment?',
			answer: 'We offer comprehensive post-deployment support including monitoring, troubleshooting, regular updates, performance optimization, and training for your team. Choose from our tiered support plans based on your needs.'
		}
	];

	const accordion = document.getElementById('faq-accordion');
	let currentOpenId = null;

	function createAccordionItem(item) {
		const container = document.createElement('div');
		container.className = 'faq-item border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 bg-white/5 hover:border-cyan-500/30';
		container.setAttribute('data-faq-id', item.id);

		const button = document.createElement('button');
		button.className = 'faq-button w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-inset';
		button.setAttribute('aria-expanded', 'false');
		button.setAttribute('aria-controls', `faq-answer-${item.id}`);
		
		const titleSpan = document.createElement('span');
		titleSpan.textContent = item.question;
		
		const iconSpan = document.createElement('span');
		iconSpan.className = 'faq-icon ml-4 flex-shrink-0 transition-transform duration-300';
		iconSpan.innerHTML = `
			<svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
			</svg>
		`;

		button.appendChild(titleSpan);
		button.appendChild(iconSpan);

		const answer = document.createElement('div');
		answer.id = `faq-answer-${item.id}`;
		answer.className = 'faq-answer max-h-0 overflow-hidden transition-all duration-300';
		answer.setAttribute('role', 'region');
		answer.setAttribute('aria-labelledby', `faq-button-${item.id}`);
		
		const answerContent = document.createElement('div');
		answerContent.className = 'px-6 py-4 text-gray-300 text-sm leading-relaxed';
		answerContent.textContent = item.answer;

		answer.appendChild(answerContent);

		button.id = `faq-button-${item.id}`;
		button.addEventListener('click', () => toggleAccordion(item.id, container, button, answer));
		
		// Keyboard navigation
		button.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				const nextItem = container.nextElementSibling?.querySelector('.faq-button');
				if (nextItem) nextItem.focus();
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				const prevItem = container.previousElementSibling?.querySelector('.faq-button');
				if (prevItem) prevItem.focus();
			}
		});

		container.appendChild(button);
		container.appendChild(answer);
		return container;
	}

	function toggleAccordion(id, container, button, answer) {
		// Close current open
		if (currentOpenId !== null && currentOpenId !== id) {
			const prevContainer = accordion.querySelector(`[data-faq-id="${currentOpenId}"]`);
			const prevButton = prevContainer?.querySelector('.faq-button');
			const prevAnswer = prevContainer?.querySelector('.faq-answer');
			if (prevButton && prevAnswer) {
				prevButton.setAttribute('aria-expanded', 'false');
				prevAnswer.style.maxHeight = '0px';
				prevContainer.classList.remove('border-cyan-500/50', 'bg-white/10');
			}
		}

		// Toggle current
		const isOpen = currentOpenId === id;
		if (isOpen) {
			button.setAttribute('aria-expanded', 'false');
			answer.style.maxHeight = '0px';
			container.classList.remove('border-cyan-500/50', 'bg-white/10');
			currentOpenId = null;
		} else {
			button.setAttribute('aria-expanded', 'true');
			answer.style.maxHeight = answer.scrollHeight + 'px';
			container.classList.add('border-cyan-500/50', 'bg-white/10');
			currentOpenId = id;
		}
	}

	// Render FAQ items
	faqData.forEach(item => {
		accordion.appendChild(createAccordionItem(item));
	});

	// Contact Form Validation
	const contactForm = document.getElementById('contact-form');
	if (contactForm) {
		const successMessage = document.getElementById('contact-success');
		const submitBtn = document.getElementById('submit-btn');
		const nameInput = document.getElementById('contact-name');
		const emailInput = document.getElementById('contact-email');
		const messageInput = document.getElementById('contact-message');

		// Enable submit button on load
		submitBtn.disabled = false;

		const validateEmail = (email) => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(email);
		};

		const showError = (fieldId, message) => {
			const errorSpan = document.getElementById(`error-${fieldId}`);
			if (errorSpan) {
				errorSpan.textContent = message;
				errorSpan.classList.remove('hidden');
				document.getElementById(`contact-${fieldId}`).classList.add('border-red-500');
			}
		};

		const clearError = (fieldId) => {
			const errorSpan = document.getElementById(`error-${fieldId}`);
			if (errorSpan) {
				errorSpan.classList.add('hidden');
				document.getElementById(`contact-${fieldId}`).classList.remove('border-red-500');
			}
		};

		// Real-time validation
		[nameInput, emailInput, messageInput].forEach(input => {
			input.addEventListener('blur', () => {
				const fieldName = input.name;
				const fieldId = input.id.replace('contact-', '');

				if (!input.value.trim()) {
					showError(fieldId, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
				} else if (fieldName === 'email' && !validateEmail(input.value)) {
					showError(fieldId, 'Please enter a valid email address');
				} else {
					clearError(fieldId);
				}
			});
		});

		const setLoading = (isLoading) => {
			submitBtn.disabled = isLoading;
			if (isLoading) {
				submitBtn.classList.add('opacity-75');
			} else {
				submitBtn.classList.remove('opacity-75');
			}
		};

		contactForm.addEventListener('submit', (e) => {
			e.preventDefault();

			// Clear all previous errors
			['name', 'email', 'message'].forEach(field => clearError(field));

			let isValid = true;
			const formData = {
				name: nameInput.value.trim(),
				email: emailInput.value.trim(),
				company: document.getElementById('contact-company').value.trim(),
				message: messageInput.value.trim()
			};

			// Validate name
			if (!formData.name) {
				showError('name', 'Name is required');
				isValid = false;
			}

			// Validate email
			if (!formData.email) {
				showError('email', 'Email is required');
				isValid = false;
			} else if (!validateEmail(formData.email)) {
				showError('email', 'Please enter a valid email address');
				isValid = false;
			}

			// Validate message
			if (!formData.message) {
				showError('message', 'Message is required');
				isValid = false;
			}

			if (isValid) {
				// Set loading state
				setLoading(true);

				// Simulate form submission (replace with actual API call)
				setTimeout(() => {
					// Show success message
					successMessage.classList.remove('hidden');
					contactForm.reset();
					setLoading(false);

					// Hide success message after 5 seconds
					setTimeout(() => {
						successMessage.classList.add('hidden');
					}, 5000);

					// In a real application, you would send this data to a server
					console.log('Form submitted:', formData);
				}, 1500);
			}
		});
	}
});
