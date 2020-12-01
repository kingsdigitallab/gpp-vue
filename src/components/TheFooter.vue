<template>
  <footer>
		<div class="footer-logos">
			<a href="https://kcl.ac.uk" title="KCL link">
				<img src="@/assets/images/kings-college.png" alt="Kings college London logo">
			</a>
			<a href="https://www.rct.uk/" title="RCT link">
				<img src="@/assets/images/royal-trust.png" alt="Royal collection trust logo">
			</a>
			<a href="https://oieahc.wm.edu/" title="Omohundro institute link">
				<img src="@/assets/images/omohundro-insitute.png" alt="Omohundro institute logo">
			</a>
			<a href="https://www.wm.edu/" title="William and Mary link">
				<img src="@/assets/images/will-mary.png" alt="William and Mary logo">
			</a>
		</div>
		<p>
			<router-link to="/accessibility-statement">Accessibility statement</router-link>
			<span class="delimiter">|</span>© 2019-{{ new Date().getFullYear() }} Designed, developed and maintained by <a href="https://www.kdl.kcl.ac.uk/">King’s Digital Lab</a>
		</p>
	</footer>
</template>
