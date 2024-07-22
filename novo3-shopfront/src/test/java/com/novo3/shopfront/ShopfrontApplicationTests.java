package com.novo3.shopfront;

import com.novo3.shopfront.controller.ShopfrontController;
import com.novo3.shopfront.filter.JwtTokenAuthenticationFilter;
import com.novo3.shopfront.helper.TokenHelper;
import com.novo3.shopfront.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

@Disabled
@SpringBootTest
@AutoConfigureMockMvc
class ShopfrontApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired @InjectMocks
	private ShopfrontController shopfrontController;

	@Autowired
	private TokenHelper tokenHelper;

	@Autowired
	private JwtTokenAuthenticationFilter filter;

	@MockBean
	private UserService userService;

	private  String token;

	@BeforeEach
	public void setup() {
		List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ROLE_ADMIN");
		Mockito.when(userService.loadUserByUsername(Mockito.anyString())).thenReturn(new User("test-user", "test-password", authorities));
		token = tokenHelper.generateToken("test-user", authorities);
	}


	@Test
	public void adminMessageTestSuccess() throws Exception {

		/*
		MockHttpServletRequest request = new MockHttpServletRequest();
		request.addHeader("AUTHORIZATION","Bearer "+token);
		request.setRequestURI("/api/admin/message");
		MockHttpServletResponse response = new MockHttpServletResponse();
		MockFilterChain filterChain = new MockFilterChain();
		filter.doFilter(request, response, filterChain);
		Assertions.assertEquals(HttpStatus.OK.value(), response.getStatus());

		 */

		mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/message").header("AUTHORIZATION","Bearer "+token).contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	public void adminMessageTestFail() throws Exception {
		String wrongToken = "some_wrong_token";

		mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/message").header("AUTHORIZATION","Bearer "+wrongToken).contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isForbidden());

	}
}
